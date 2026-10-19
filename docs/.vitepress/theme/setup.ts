import { computed, onMounted, readonly, ref } from 'vue'
import { klipingAdd } from '../kliping-command.mjs'

/**
 * Keranjang "Start setup": item registry yang dipilih pembaca dari halaman
 * mana pun, lalu dipasang sekaligus dengan satu perintah
 * (`npx kliping@latest add button hero-01`).
 *
 * Satu keadaan untuk seluruh situs, disimpan di `localStorage` dan ikut
 * berubah di tab lain lewat event `storage`. Server dan render pertama di
 * peramban selalu melihat keranjang kosong — isinya baru dibaca setelah
 * terpasang — jadi hidrasi tidak pernah berselisih. Item yang sudah tidak ada
 * di registry (`registry-index.json`) dibuang saat dibaca.
 */

const STORAGE_KEY = 'kliping:setup'

const items = ref<string[]>([])
const known = ref<Set<string> | null>(null)
let started = false

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }
  catch {}
}

function load() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    items.value = Array.isArray(stored) ? [...new Set(stored.filter((x): x is string => typeof x === 'string'))] : []
  }
  catch {
    items.value = []
  }
  prune()
}

function prune() {
  if (!known.value)
    return
  const kept = items.value.filter(name => known.value!.has(name))
  if (kept.length !== items.value.length) {
    items.value = kept
    save()
  }
}

function start() {
  if (started || typeof window === 'undefined')
    return
  started = true
  load()
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY)
      load()
  })
  // Dimuat malas: hanya halaman yang memakai keranjang yang mengunduhnya.
  import('@/registry/registry-index.json').then((module) => {
    known.value = new Set(module.default as string[])
    prune()
  })
}

export function useSetup() {
  onMounted(start)

  const add = (name: string) => {
    if (items.value.includes(name))
      return
    items.value = [...items.value, name]
    save()
  }
  const remove = (name: string) => {
    items.value = items.value.filter(n => n !== name)
    save()
  }

  return {
    items: readonly(items),
    /** Whether `name` is a registry item (false until the index has loaded). */
    isItem: (name: string) => !!known.value?.has(name),
    has: (name: string) => items.value.includes(name),
    add,
    remove,
    toggle: (name: string) => (items.value.includes(name) ? remove(name) : add(name)),
    clear: () => {
      items.value = []
      save()
    },
    command: computed(() => klipingAdd(items.value)),
  }
}
