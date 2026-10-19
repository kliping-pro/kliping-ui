import { describe, expect, it } from 'vitest'
import { unmask, MASK_PATTERNS, applyMask } from './patterns'

describe('applyMask', () => {
  it('menyisipkan pemisah di posisinya', () => {
    expect(applyMask('081234567890', MASK_PATTERNS.phone.pattern)).toBe('0812 3456 7890')
  })

  it('membuang aksara yang tidak cocok dengan slotnya, bukan menggesernya', () => {
    // Huruf di tengah angka dibuang; sisa nomornya tetap di posisi yang benar.
    expect(applyMask('08a1234', MASK_PATTERNS.phone.pattern)).toBe('0812 34')
  })

  it('tidak meninggalkan pemisah menggantung di ujung', () => {
    expect(applyMask('1234', MASK_PATTERNS.phone.pattern)).toBe('1234')
    expect(applyMask('12', MASK_PATTERNS.date.pattern)).toBe('12')
  })

  it('menghormati slot huruf dan alfanumerik', () => {
    expect(applyMask('DK1234ABC', MASK_PATTERNS.licensePlate.pattern)).toBe('DK 1234 ABC')
  })

  it('membuang yang tidak cocok lalu memakai aksara berikutnya untuk slot yang sama', () => {
    // Slot pertama `A` menolak angka, jadi `1234` habis dibuang dan `A`
    // berikutnya yang mengisinya. Itu perilaku yang disengaja: menyisipkan
    // aksara yang salah akan menggeser seluruh sisa nilainya.
    expect(applyMask('D1234ABC', MASK_PATTERNS.licensePlate.pattern)).toBe('DA')
  })

  it('berhenti saat polanya habis', () => {
    expect(applyMask('123456789012345678', MASK_PATTERNS.card.pattern)).toBe('1234 5678 9012 3456')
  })
})

describe('unmask', () => {
  it('membuang pemisah dan menyisakan isinya', () => {
    expect(unmask('0812 3456 7890', MASK_PATTERNS.phone.pattern)).toBe('081234567890')
    expect(unmask('12/08/2026', MASK_PATTERNS.date.pattern)).toBe('12082026')
  })

  it('kebalikan dari applyMask', () => {
    const raw = '1234567890123456'
    expect(unmask(applyMask(raw, MASK_PATTERNS.nik.pattern), MASK_PATTERNS.nik.pattern)).toBe(raw)
  })
})

describe('validate', () => {
  it('menolak tanggal yang harinya melewati akhir bulan', () => {
    expect(MASK_PATTERNS.date.validate('29022024')).toBe(true)
    expect(MASK_PATTERNS.date.validate('29022025')).toBe(false)
    expect(MASK_PATTERNS.date.validate('31042026')).toBe(false)
  })

  it('memeriksa nomor kartu dengan Luhn', () => {
    expect(MASK_PATTERNS.card.validate('4539578763621486')).toBe(true)
    expect(MASK_PATTERNS.card.validate('4539578763621487')).toBe(false)
  })

  it('menolak oktet IPv4 di atas 255', () => {
    expect(MASK_PATTERNS.ipv4.validate('192168001001')).toBe(true)
    expect(MASK_PATTERNS.ipv4.validate('999168001001')).toBe(false)
  })

  it('menerima NIK enam belas angka saja', () => {
    expect(MASK_PATTERNS.nik.validate('3204012509900001')).toBe(true)
    expect(MASK_PATTERNS.nik.validate('320401250990000')).toBe(false)
  })
})
