import { COUNTRY_DATA } from './country-data'

export interface Country {
  /** ISO 3166-1 alpha-2 code, uppercase. */
  code: string
  /** The country name in the reader's language. */
  name: string
  /** The dialing code, prefixed with `+`. */
  dialCode: string
  /** The flag as an emoji. */
  flag: string
}

// Tiap huruf kode ISO punya padanan "regional indicator symbol" di Unicode,
// dan dua di antaranya berdampingan digambar peramban sebagai satu bendera.
// Jadi tidak ada satu pun berkas gambar yang perlu dibawa — dan tidak ada
// bendera yang bisa basi saat sebuah negara berganti.
/** The flag emoji, built from the country code. */
export function getFlag(code: string): string {
  const codePoints = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

/** The country name in the requested locale, or its code when unrecognized. */
export function getCountryName(code: string, locale?: string): string {
  try {
    return new Intl.DisplayNames([locale ?? 'id'], { type: 'region' }).of(code) ?? code
  }
  catch {
    return code
  }
}

/** The full country list, sorted by name in the requested locale. */
export function getCountries(locale?: string): Country[] {
  return COUNTRY_DATA
    .map(([iso2, dialCode]) => {
      const code = iso2.toUpperCase()
      return { code, name: getCountryName(code, locale), dialCode: `+${dialCode}`, flag: getFlag(code) }
    })
    .sort((a, b) => a.name.localeCompare(b.name, locale ?? 'id'))
}

/**
 * Negara yang dipilih saat beberapa berbagi satu kode telepon.
 *
 * Delapan kode dipakai bersama di tabel ini, dan `+1` sendiri dipakai empat
 * negara. Tidak ada cara membedakannya dari kode teleponnya saja — yang
 * membedakan nomor Kanada dari nomor Amerika Serikat tiga angka
 * berikutnya, dan menabelkan seluruhnya jauh melampaui kegunaan komponen ini.
 *
 * Sumbernya cuma menangani `+1` dan menyerahkan sisanya pada urutan abjad —
 * yang membuat `+44` terbaca sebagai Guernsey alih-alih Britania Raya, karena
 * G lebih dulu dari U. Di sini kedelapannya disebut, dan yang dipilih negara
 * dengan penduduk terbanyak untuk tiap kode.
 */
const PRIMARY_COUNTRIES: Record<string, string> = {
  '+1': 'US',
  '+44': 'GB',
  '+590': 'GP',
  '+7': 'RU',
  '+39': 'IT',
  '+212': 'MA',
  '+358': 'FI',
  '+599': 'CW',
}

// Kode terpanjang yang cocok yang menang: `+1268` (Antigua) harus dikenali
// sebelum `+1`, kalau tidak seluruh Amerika Utara terbaca sebagai satu
// negara.
/** Guesses the country from a number prefixed with `+`; the longest matching code wins. */
export function guessCountry(number: string, countries: Country[]): Country | undefined {
  if (!number.startsWith('+')) return undefined

  const digits = number.slice(1).replace(/\D/g, '')
  if (!digits) return undefined

  const matches = [...countries]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .filter(n => digits.startsWith(n.dialCode.slice(1)))

  const first = matches[0]
  if (!first) return undefined

  const primary = PRIMARY_COUNTRIES[first.dialCode]
  if (primary) return matches.find(n => n.code === primary) ?? first

  return first
}

/** The number without its dialing code, digits only. */
export function stripDialCode(number: string, country: Country | undefined): string {
  const digits = number.replace(/\D/g, '')
  if (!country) return digits
  const code = country.dialCode.slice(1)
  return digits.startsWith(code) ? digits.slice(code.length) : digits
}
