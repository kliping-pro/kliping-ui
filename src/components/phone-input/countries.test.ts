import { describe, expect, it } from 'vitest'
import { getCountries, getFlag, guessCountry, stripDialCode } from './countries'

const countries = getCountries('en')

describe('getFlag', () => {
  it('menyusun emoji bendera dari kode ISO', () => {
    expect(getFlag('ID')).toBe('🇮🇩')
    expect(getFlag('id')).toBe('🇮🇩')
  })
})

describe('guessCountry', () => {
  it('mengenali kode negara biasa', () => {
    expect(guessCountry('+6281234567890', countries)?.code).toBe('ID')
    expect(guessCountry('+442071234567', countries)?.code).toBe('GB')
  })

  it('memilih kode terpanjang yang cocok', () => {
    // `+1268` harus menang atas `+1`, kalau tidak Antigua terbaca sebagai
    // Amerika Serikat.
    expect(guessCountry('+12684601234', countries)?.code).toBe('AG')
  })

  it('memilih negara utama saat kodenya dipakai bersama', () => {
    expect(guessCountry('+15551234567', countries)?.code).toBe('US')
    expect(guessCountry('+79161234567', countries)?.code).toBe('RU')
    expect(guessCountry('+390612345678', countries)?.code).toBe('IT')
  })

  it('mengabaikan nomor tanpa awalan plus', () => {
    expect(guessCountry('081234567890', countries)).toBeUndefined()
  })
})

describe('stripDialCode', () => {
  it('membuang kode negaranya', () => {
    const id = countries.find(n => n.code === 'ID')
    expect(stripDialCode('+62 812 3456 7890', id)).toBe('81234567890')
  })

  it('membiarkan nomor yang tidak berawalan kode itu', () => {
    const id = countries.find(n => n.code === 'ID')
    expect(stripDialCode('081234567890', id)).toBe('081234567890')
  })
})
