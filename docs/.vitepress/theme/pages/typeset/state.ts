import type { ControlKey, Settings } from './data'
import { computed, reactive, ref, watch } from 'vue'
import { randomizeSettings, DEFAULTS, readQuery, selectedFonts, SETTING_KEYS, loadFont, writeQuery } from './data'

/**
 * Keadaan penyusun typeset, satu untuk seluruh halaman.
 *
 * Disimpan di query URL, bukan di `localStorage`: tautan yang disalin dari
 * bilah alamat membawa rancangannya, dan "Open in New Tab" cukup meneruskan
 * query yang sama ke halaman lepasnya.
 *
 * Server selalu merender nilai bawaan. Query baru dibaca setelah terpasang
 * (`start()`), jadi hidrasinya tidak pernah berselisih.
 */
const settings = reactive<Settings>({ ...DEFAULTS })

/**
 * Pratinjau sementara saat penunjuk berhenti di atas satu pilihan menu.
 * Ditumpuk di atas setelan tanpa menyentuhnya; dibersihkan saat menu ditutup.
 */
const preview = ref<Partial<Settings> | null>(null)

const displayed = computed<Settings>(() => ({ ...settings, ...(preview.value ?? {}) }))

/**
 * Setelan yang dilewati Shuffle. Hanya untuk sesi ini — sama dengan upstream,
 * kunci tidak ikut ke URL, jadi tautan yang dibagikan tidak membawa kunci
 * orang lain.
 */
const locked = ref<ControlKey[]>([])

function isLocked(k: ControlKey) {
  return locked.value.includes(k)
}

function toggleLock(k: ControlKey) {
  locked.value = isLocked(k)
    ? locked.value.filter(x => x !== k)
    : [...locked.value, k]
}

/**
 * Riwayat undo/redo: tumpukan potret setelan, satu per perubahan.
 *
 * Riwayat peramban tidak bisa dipakai — setiap perubahan ditulis dengan
 * `replaceState`, jadi tidak ada yang bisa di-pop. Potretnya JSON seluruh
 * setelan, termasuk naskah contoh, sama seperti upstream yang memotret seluruh
 * query. Shuffle dan Reset mengubah banyak setelan sekaligus, tapi watcher-nya
 * baru berjalan sekali setelah semuanya selesai, jadi masing-masing tetap satu
 * langkah.
 */
const snapshots = ref<string[]>([])
const position = ref(0)

// Dinyalakan saat memulihkan potret, supaya perubahan yang dibuatnya sendiri
// tidak dicatat sebagai langkah baru.
let restoring = false

const canUndo = computed(() => position.value > 0)
const canRedo = computed(() => position.value < snapshots.value.length - 1)

function snapshot(s: Settings) {
  return JSON.stringify(SETTING_KEYS.map(k => s[k]))
}

function record(s: Settings) {
  const next = snapshot(s)
  // Potret pertama mengisi tumpukan, tanpa langkah untuk di-undo.
  if (snapshots.value.length === 0) {
    snapshots.value = [next]
    position.value = 0
    return
  }
  if (restoring) {
    restoring = false
    return
  }
  if (next === snapshots.value[position.value])
    return
  // Perubahan baru setelah undo membuang ekor redo-nya.
  snapshots.value = [...snapshots.value.slice(0, position.value + 1), next]
  position.value = snapshots.value.length - 1
}

function restore(i: number) {
  const entry = snapshots.value[i]
  if (entry === undefined)
    return
  const values = JSON.parse(entry) as string[]
  const s = Object.fromEntries(SETTING_KEYS.map((k, j) => [k, values[j]]))
  position.value = i
  // Potret yang sama dengan setelan sekarang tidak memicu watcher, jadi
  // penandanya tidak boleh dinyalakan — ia akan menelan perubahan berikutnya.
  if (entry !== snapshot(settings)) {
    restoring = true
    Object.assign(settings, s)
  }
}

function undo() {
  if (canUndo.value)
    restore(position.value - 1)
}

function redo() {
  if (canRedo.value)
    restore(position.value + 1)
}

/**
 * Dipanggil dari `onMounted` halaman yang memakainya. Watcher-nya ikut terikat
 * ke komponen itu dan berhenti saat halamannya ditinggalkan; kembali ke
 * halaman ini membaca ulang query dari URL yang baru.
 */
function start() {
  if (typeof window === 'undefined')
    return
  preview.value = null
  Object.assign(settings, { ...DEFAULTS, ...readQuery(window.location.search) })

  // Riwayatnya hidup selama sesi, sama dengan `useState` di upstream: pindah
  // ke halaman lain lalu kembali tidak menghapusnya. Kunjungan pertama memulai
  // tumpukan dari rancangan yang dibuka; kunjungan berikutnya mencatat
  // rancangan dari URL sebagai langkah baru kalau berbeda dari posisi terakhir.
  restoring = false
  record(settings)
  watch(settings, record)

  // `history.state` dibawa apa adanya: router VitePress menyimpan posisi
  // gulir di sana, dan menimpanya membuat tombol Back kehilangan tempatnya.
  watch(settings, (s) => {
    const url = `${window.location.pathname}${writeQuery(s)}${window.location.hash}`
    window.history.replaceState(window.history.state, '', url)
  })

  watch(displayed, (s) => {
    const { body, heading, mono } = selectedFonts(s)
    ;[body, heading, mono].forEach(loadFont)
  }, { immediate: true })
}

function update(values: Partial<Settings>) {
  Object.assign(settings, values)
}

function shuffle() {
  update(randomizeSettings(settings, locked.value))
}

/** Semua setelan kembali ke bawaan, naskah contoh ikut kembali ke 01 — sama dengan upstream. */
function reset() {
  update({ ...DEFAULTS })
}

/**
 * Pratinjau baru dipasang setelah penunjuk diam 50 ms — sama dengan upstream.
 * Setiap gerakan menyetel ulang penghitungnya, jadi menyapu menu dari atas ke
 * bawah tidak memuat setiap fon yang dilewati. Membersihkan tidak pernah
 * ditunda: kembali ke pilihan sebenarnya harus terasa seketika.
 */
let previewTimer: ReturnType<typeof setTimeout> | undefined

function peek(values: Partial<Settings> | null) {
  clearTimeout(previewTimer)
  if (!values) {
    preview.value = null
    return
  }
  previewTimer = setTimeout(() => {
    preview.value = values
  }, 50)
}

export function useTypeset() {
  return {
    settings,
    displayed,
    start,
    update,
    shuffle,
    reset,
    peek,
    locked,
    isLocked,
    toggleLock,
    canUndo,
    canRedo,
    undo,
    redo,
  }
}
