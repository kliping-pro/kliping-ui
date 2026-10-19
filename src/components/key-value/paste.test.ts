import { describe, expect, it } from 'vitest'
import { parsePaste, unquote } from './paste'

describe('parsePaste', () => {
  it('membaca bentuk .env', () => {
    expect(parsePaste('API_KEY=rahasia\nDEBUG=true')).toEqual([
      { key: 'API_KEY', value: 'rahasia' },
      { key: 'DEBUG', value: 'true' },
    ])
  })

  it('membaca bentuk berdua-titik', () => {
    expect(parsePaste('Nama: Rani\nKota: Bandung')).toEqual([
      { key: 'Nama', value: 'Rani' },
      { key: 'Kota', value: 'Bandung' },
    ])
  })

  it('membaca salinan spreadsheet yang dipisah tab', () => {
    expect(parsePaste('Nama\tRani\nKota\tBandung')).toEqual([
      { key: 'Nama', value: 'Rani' },
      { key: 'Kota', value: 'Bandung' },
    ])
  })

  it('memilih `=` lebih dulu supaya URL tidak terpotong di titik duanya', () => {
    expect(parsePaste('URL=https://contoh.com/a')).toEqual([
      { key: 'URL', value: 'https://contoh.com/a' },
    ])
  })

  it('melepas kutip yang mengurung nilainya', () => {
    expect(parsePaste('PESAN="halo dunia"')).toEqual([
      { key: 'PESAN', value: 'halo dunia' },
    ])
    expect(parsePaste('PESAN="halo dunia"', { stripQuotes: false })).toEqual([
      { key: 'PESAN', value: '"halo dunia"' },
    ])
  })

  it('melewati baris kosong dan baris tanpa pemisah', () => {
    expect(parsePaste('A=1\n\nbaris tanpa pemisah\nB=2')).toEqual([
      { key: 'A', value: '1' },
      { key: 'B', value: '2' },
    ])
  })

  it('membiarkan nilai kosong', () => {
    expect(parsePaste('KOSONG=')).toEqual([{ key: 'KOSONG', value: '' }])
  })
})

describe('unquote', () => {
  it('cuma melepas kutip yang mengurung seluruhnya', () => {
    expect(unquote('"a"', true)).toBe('a')
    expect(unquote('"a" dan "b"', true)).toBe('"a" dan "b"')
  })
})
