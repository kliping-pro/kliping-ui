import { describe, expect, it } from 'vitest'
import { matchesAccept, validateFiles, formatFileSize } from './files'

function berkas(nama: string, tipe: string, ukuran = 100): File {
  return new File(['x'.repeat(ukuran)], nama, { type: tipe })
}

describe('formatFileSize', () => {
  it('memakai satuan yang paling pas', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(1536)).toBe('1.5 KB')
    expect(formatFileSize(15 * 1024 * 1024)).toBe('15 MB')
  })
})

describe('matchesAccept', () => {
  it('menerima semuanya kalau tidak dibatasi', () => {
    expect(matchesAccept(berkas('a.txt', 'text/plain'))).toBe(true)
  })

  it('mencocokkan akhiran nama', () => {
    expect(matchesAccept(berkas('laporan.PDF', ''), '.pdf')).toBe(true)
    expect(matchesAccept(berkas('laporan.doc', ''), '.pdf')).toBe(false)
  })

  it('mencocokkan tipe MIME persis dan kelompoknya', () => {
    expect(matchesAccept(berkas('a.png', 'image/png'), 'image/png')).toBe(true)
    expect(matchesAccept(berkas('a.png', 'image/png'), 'image/*')).toBe(true)
    expect(matchesAccept(berkas('a.png', 'image/png'), 'video/*')).toBe(false)
  })

  it('menerima kalau salah satu pola cocok', () => {
    expect(matchesAccept(berkas('a.png', 'image/png'), '.pdf,image/*')).toBe(true)
  })
})

describe('validateFiles', () => {
  it('menolak yang tipenya tidak diterima', () => {
    const hasil = validateFiles([berkas('a.txt', 'text/plain')], [], { accept: 'image/*' })
    expect(hasil.accepted).toHaveLength(0)
    expect(hasil.rejected[0]?.reason).toBe('type')
  })

  it('menolak yang melebihi ukuran', () => {
    const hasil = validateFiles([berkas('a.png', 'image/png', 200)], [], { maxSize: 100 })
    expect(hasil.rejected[0]?.reason).toBe('size')
  })

  it('menolak yang melebihi jumlah, menghitung yang sudah ada', () => {
    const hasil = validateFiles(
      [berkas('b.png', 'image/png'), berkas('c.png', 'image/png')],
      [berkas('a.png', 'image/png')],
      { maxFiles: 2 },
    )
    expect(hasil.accepted).toHaveLength(1)
    expect(hasil.rejected[0]?.reason).toBe('count')
  })

  it('menolak berkas yang sudah ditambahkan', () => {
    const sama = berkas('a.png', 'image/png')
    const hasil = validateFiles([sama], [sama], {})
    expect(hasil.rejected[0]?.reason).toBe('duplicate')
  })

  it('menolak yang sama dua kali dalam satu tempelan', () => {
    const sama = berkas('a.png', 'image/png')
    const hasil = validateFiles([sama, sama], [], {})
    expect(hasil.accepted).toHaveLength(1)
    expect(hasil.rejected[0]?.reason).toBe('duplicate')
  })
})
