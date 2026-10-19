<script setup lang="ts">
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  BlocksIcon,
  BracesIcon,
  ChartAreaIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CopyIcon,
  CopyPlusIcon,
  EyeIcon,
  EyeOffIcon,
  GripVerticalIcon,
  HammerIcon,
  KeyboardIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  LinkIcon,
  MonitorIcon,
  MoonIcon,
  PackageIcon,
  PencilIcon,
  PlusIcon,
  Redo2Icon,
  SearchIcon,
  ShapesIcon,
  SmartphoneIcon,
  SunIcon,
  TabletIcon,
  Trash2Icon,
  Undo2Icon,
  XIcon,
} from '@lucide/vue'
import { withBase } from 'vitepress'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClipboard } from '@/composables/use-clipboard'
import { klipingAddPage } from '../../kliping-command.mjs'
import { CATALOG } from '../gallery'
import PackageCommand from '../PackageCommand.vue'

/**
 * Kliping Builder — builder halaman, layar penuh (spesifikasi:
 * KLIPING-BUILDER.md). Block diseret dari sidebar ke kanvas atau diklik,
 * diurutkan dengan seret-lepas atau tombol, lalu Setup memberi satu perintah
 * `kliping add` plus berkas halaman yang merender semuanya sesuai urutan.
 *
 * Seret-lepas memakai HTML5 Drag and Drop bawaan peramban (tanpa pustaka).
 * Setiap aksi seret punya padanan klik/tombol/keyboard, jadi layar sentuh dan
 * pembaca layar tidak tertinggal. Seluruh keadaan ada di URL
 * (`?n=Landing+page&b=navbar-01,hero-03`): tanpa akun, tanpa server.
 */

/**
 * Bilah atas: Builder (halaman ini) sejajar dengan katalog lain di situs.
 * Hanya ada builder halaman — yang lain tautan ke katalognya.
 */
const TOOLS = [
  { title: 'Components', href: '/components', icon: BlocksIcon },
  { title: 'Blocks', href: '/blocks', icon: LayoutGridIcon },
  { title: 'Variants', href: '/variants', icon: ShapesIcon },
  { title: 'Charts', href: '/charts', icon: ChartAreaIcon },
  { title: 'Hooks', href: '/hooks', icon: BracesIcon },
  { title: 'Templates', href: '/templates', icon: LayoutTemplateIcon },
] as const

const catalog = CATALOG.block
const categories = catalog.categories.filter(c => c.slug !== 'featured' && c.items.length)
const allBlocks = new Set(categories.flatMap(c => c.items))
const categoryName = (name: string) => catalog.categoryOf(name)?.name ?? ''

/** Susunan contoh: satu landing page lengkap dari kategori pemasaran. */
const SAMPLE_CATEGORIES = ['navbar', 'hero', 'logo-cloud', 'features', 'stats', 'testimonials', 'pricing', 'faq', 'cta', 'footer']
const sample = SAMPLE_CATEGORIES.map(slug => categories.find(c => c.slug === slug)?.items[0]).filter((n): n is string => !!n)

// --- Keadaan -------------------------------------------------------------------

const stack = ref<string[]>([])
const keys = ref<number[]>([])
let nextKey = 0
const selected = ref<number | null>(null)
const pageName = ref('Untitled page')
const editingName = ref(false)
const preview = ref(false)

/** Each row keeps a stable key, so moving a row does not reload its iframe. */
function setStack(next: string[], nextKeys: number[], record = true) {
  if (record) {
    past.value = [...past.value.slice(-(HISTORY_LIMIT - 1)), { stack: stack.value, keys: keys.value }]
    future.value = []
  }
  stack.value = next
  keys.value = nextKeys
}

// Riwayat: setiap perubahan susunan menyimpan keadaan sebelumnya.
interface Snapshot { stack: string[], keys: number[] }
const HISTORY_LIMIT = 100
const past = ref<Snapshot[]>([])
const future = ref<Snapshot[]>([])

function undo() {
  const prev = past.value.at(-1)
  if (!prev)
    return
  past.value = past.value.slice(0, -1)
  future.value = [...future.value, { stack: stack.value, keys: keys.value }]
  setStack(prev.stack, prev.keys, false)
  selected.value = null
}

function redo() {
  const next = future.value.at(-1)
  if (!next)
    return
  future.value = future.value.slice(0, -1)
  past.value = [...past.value, { stack: stack.value, keys: keys.value }]
  setStack(next.stack, next.keys, false)
  selected.value = null
}

function insert(name: string, at = stack.value.length) {
  setStack(
    [...stack.value.slice(0, at), name, ...stack.value.slice(at)],
    [...keys.value.slice(0, at), nextKey++, ...keys.value.slice(at)],
  )
  selected.value = at
  nextTick(() => document.getElementById(`builder-row-${at}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
}

/** Click on a sidebar block: below the selected section, or at the end. */
function addFromSidebar(name: string) {
  insert(name, selected.value === null ? stack.value.length : selected.value + 1)
  libraryOpen.value = false
}

/** Layar sempit: sidebar tampil sebagai panel penuh lewat tombol "Add block". */
const libraryOpen = ref(false)

function moveRow(from: number, to: number) {
  if (to < 0 || to >= stack.value.length || from === to)
    return
  const names = [...stack.value]
  const k = [...keys.value]
  const [name] = names.splice(from, 1)
  const [key] = k.splice(from, 1)
  names.splice(to, 0, name!)
  k.splice(to, 0, key!)
  setStack(names, k)
  selected.value = to
}

function removeRow(index: number) {
  setStack(stack.value.filter((_, i) => i !== index), keys.value.filter((_, i) => i !== index))
  selected.value = stack.value.length ? Math.min(index, stack.value.length - 1) : null
}

const duplicateRow = (index: number) => insert(stack.value[index]!, index + 1)

function replaceRow(index: number, name: string) {
  const names = [...stack.value]
  names[index] = name
  setStack(names, keys.value)
}

const siblingsOf = (name: string) => catalog.categoryOf(name)?.items ?? [name]

function clearAll() {
  setStack([], [])
  selected.value = null
}

function loadSample() {
  setStack([...sample], sample.map(() => nextKey++))
  selected.value = null
}

// --- URL -------------------------------------------------------------------------

function readUrl() {
  const params = new URLSearchParams(window.location.search)
  const names = (params.get('b') ?? '').split(',').map(s => s.trim()).filter(n => allBlocks.has(n))
  setStack(names, names.map(() => nextKey++), false)
  pageName.value = params.get('n')?.trim() || 'Untitled page'
}

watch([stack, pageName], ([names, name]) => {
  if (typeof window === 'undefined')
    return
  const url = new URL(window.location.href)
  names.length ? url.searchParams.set('b', names.join(',')) : url.searchParams.delete('b')
  name && name !== 'Untitled page' ? url.searchParams.set('n', name) : url.searchParams.delete('n')
  window.history.replaceState(window.history.state, '', url)
})

// --- Sidebar -----------------------------------------------------------------------

const query = ref('')
const openCategories = ref(new Set(['hero']))
function toggleCategory(slug: string) {
  const next = new Set(openCategories.value)
  next.has(slug) ? next.delete(slug) : next.add(slug)
  openCategories.value = next
}

const results = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length)
    return []
  return categories.flatMap(c => c.items.filter((n) => {
    const text = `${n} ${c.name} ${catalog.description(n)}`.toLowerCase()
    return words.every(w => text.includes(w))
  }))
})

// --- Seret-lepas ----------------------------------------------------------------------

type DragSource = { kind: 'new', name: string } | { kind: 'row', index: number }
const dragSource = ref<DragSource | null>(null)
const dropIndex = ref<number | null>(null)
const canvasEl = ref<HTMLElement>()

function startNew(event: DragEvent, name: string) {
  dragSource.value = { kind: 'new', name }
  event.dataTransfer?.setData('text/plain', name)
  if (event.dataTransfer)
    event.dataTransfer.effectAllowed = 'copy'
}

function startRow(event: DragEvent, index: number) {
  dragSource.value = { kind: 'row', index }
  selected.value = index
  event.dataTransfer?.setData('text/plain', stack.value[index]!)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    const row = document.getElementById(`builder-row-${index}`)
    if (row)
      event.dataTransfer.setDragImage(row, 24, 16)
  }
}

/** Gap under the pointer: before the first row whose middle is below it. */
function onDragOver(event: DragEvent) {
  if (!dragSource.value)
    return
  event.preventDefault()
  if (event.dataTransfer)
    event.dataTransfer.dropEffect = dragSource.value.kind === 'new' ? 'copy' : 'move'
  const rows = [...(canvasEl.value?.querySelectorAll<HTMLElement>('[data-builder-row]') ?? [])]
  const index = rows.findIndex((row) => {
    const r = row.getBoundingClientRect()
    return event.clientY < r.top + r.height / 2
  })
  dropIndex.value = index === -1 ? rows.length : index
  autoScroll(event.clientY)
}

/** Near the canvas edge, scroll it — dragover keeps firing while held still. */
const EDGE = 80
function autoScroll(y: number) {
  const el = canvasEl.value
  if (!el)
    return
  const r = el.getBoundingClientRect()
  if (y < r.top + EDGE)
    el.scrollTop -= Math.ceil((r.top + EDGE - y) / 4)
  else if (y > r.bottom - EDGE)
    el.scrollTop += Math.ceil((y - (r.bottom - EDGE)) / 4)
}

function onDragLeave(event: DragEvent) {
  if (!canvasEl.value?.contains(event.relatedTarget as Node | null))
    dropIndex.value = null
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  const source = dragSource.value
  const at = dropIndex.value ?? stack.value.length
  if (source?.kind === 'new')
    insert(source.name, at)
  else if (source?.kind === 'row')
    moveRow(source.index, at > source.index ? at - 1 : at)
  endDrag()
}

function endDrag() {
  dragSource.value = null
  dropIndex.value = null
}

// --- Pratinjau ------------------------------------------------------------------------

const WIDTHS = [
  { id: 'desktop', label: 'Desktop', icon: MonitorIcon, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: TabletIcon, width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: SmartphoneIcon, width: '390px' },
] as const
const widthMode = ref<(typeof WIDTHS)[number]['id']>('desktop')
const frameWidth = computed(() => WIDTHS.find(w => w.id === widthMode.value)!.width)
const dark = ref(false)

const heights = ref<Record<number, string>>({})
const observers = new Map<number, ResizeObserver>()

/** Iframe height follows its content (#app; /view pages are window-tall). */
function onFrameLoad(event: Event, key: number) {
  const doc = (event.target as HTMLIFrameElement).contentDocument
  if (!doc)
    return
  doc.documentElement.classList.toggle('dark', dark.value)
  const content = doc.querySelector('#app') ?? doc.body
  const measure = () => {
    const h = Math.ceil(content.getBoundingClientRect().height)
    if (h > 0)
      heights.value = { ...heights.value, [key]: `${h}px` }
  }
  observers.get(key)?.disconnect()
  const ro = new ResizeObserver(measure)
  ro.observe(content)
  observers.set(key, ro)
  measure()
}

watch(dark, (value) => {
  for (const frame of document.querySelectorAll<HTMLIFrameElement>('iframe[data-builder-frame]'))
    frame.contentDocument?.documentElement.classList.toggle('dark', value)
})

// --- Setup ----------------------------------------------------------------------------

const setupOpen = ref(false)
const helpOpen = ref(false)
const componentName = (name: string) => name.split(/[^a-z0-9]+/i).filter(Boolean).map(p => p[0]!.toUpperCase() + p.slice(1)).join('')
/** Page name → file name: "Landing page" → LandingPage.vue. */
const fileName = computed(() => {
  const base = componentName(pageName.value === 'Untitled page' ? 'landing page' : pageName.value)
  return `${/^[a-z]/i.test(base) ? base : `Page${base}`}.vue`
})
/** The CLI writes the page itself (`--page`, kliping 0.2.0): imports and order. */
const command = computed(() => klipingAddPage(stack.value, `src/${fileName.value}`))
/** App.vue that shows the page. */
const appCode = computed(() => {
  const component = fileName.value.replace(/\.vue$/, '')
  return `<script setup lang="ts">\nimport ${component} from './${fileName.value}'\n</${'script'}>\n\n<template>\n  <${component} />\n</template>\n`
})

const { copy: copyCode, copied: codeCopied } = useClipboard({ copiedDuring: 1600 })
const { copy: copyLink, copied: linkCopied } = useClipboard({ copiedDuring: 1600 })
const copyCurrentLink = () => copyLink(window.location.href)

// --- Keyboard ---------------------------------------------------------------------------

const SHORTCUTS = [
  ['Delete', 'Remove the selected section'],
  ['Alt ↑ / Alt ↓', 'Move the selected section'],
  ['D', 'Duplicate the selected section'],
  ['Ctrl Z / Ctrl ⇧ Z', 'Undo / redo'],
  ['P', 'Toggle full preview'],
  ['Esc', 'Deselect, or leave preview'],
  ['?', 'Show these shortcuts'],
] as const

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable="true"]') || setupOpen.value || helpOpen.value)
    return
  const i = selected.value
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.shiftKey ? redo() : undo()
  }
  else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
    redo()
  }
  else if (event.key === 'Escape') {
    if (libraryOpen.value)
      libraryOpen.value = false
    else
      preview.value ? (preview.value = false) : (selected.value = null)
  }
  else if (event.key === '?') {
    helpOpen.value = true
  }
  else if (event.key.toLowerCase() === 'p' && !event.metaKey && !event.ctrlKey) {
    preview.value = !preview.value
  }
  else if (i !== null && (event.key === 'Delete' || event.key === 'Backspace')) {
    removeRow(i)
  }
  else if (i !== null && event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    moveRow(i, i + (event.key === 'ArrowUp' ? -1 : 1))
  }
  else if (i !== null && event.key.toLowerCase() === 'd' && !event.metaKey && !event.ctrlKey) {
    duplicateRow(i)
  }
  else {
    return
  }
  event.preventDefault()
}

onMounted(() => {
  readUrl()
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  observers.forEach(o => o.disconnect())
})
</script>

<template>
  <div class="bg-background text-foreground flex h-svh flex-col overflow-hidden" @dragend="endDrag">
    <!-- Bilah atas: satu alat saja — Builder halaman. -->
    <header class="flex h-12 shrink-0 items-center gap-3 border-b px-4">
      <a :href="withBase('/')" class="flex items-center gap-2 font-semibold tracking-tight no-underline">
        <img :src="withBase('/favicon.svg')" alt="" class="size-6">
        <span class="hidden sm:inline">kliping.pro</span>
      </a>
      <span class="bg-border h-5 w-px shrink-0" />
      <nav aria-label="Tools" class="-my-2 flex min-w-0 items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        <span aria-current="page" title="Builder" class="bg-pill flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 font-medium text-sm">
          <HammerIcon class="size-4" />
          <span class="max-sm:sr-only">Builder</span>
        </span>
        <a
          v-for="t in TOOLS"
          :key="t.href"
          :href="withBase(t.href)"
          :title="t.title"
          class="text-muted-foreground hover:bg-muted hover:text-foreground flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm no-underline"
        >
          <component :is="t.icon" class="size-4" />
          <span class="max-lg:hidden">{{ t.title }}</span>
        </a>
      </nav>
    </header>

    <!-- Bilah halaman -->
    <div class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <a :href="withBase('/blocks')" class="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 text-sm no-underline md:flex">
        <ArrowLeftIcon class="size-4" /> Back to Blocks
      </a>
      <span class="bg-border mx-2 hidden h-5 w-px md:block" />
      <input
        v-if="editingName"
        v-model="pageName"
        class="w-48 rounded-md border bg-background px-2 py-1 font-semibold text-lg"
        aria-label="Page name"
        autofocus
        @blur="editingName = false; pageName = pageName.trim() || 'Untitled page'"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
      >
      <button v-else type="button" class="flex min-w-0 items-center gap-2 rounded-md px-1 py-1 font-semibold text-lg hover:bg-muted" title="Rename page" @click="editingName = true">
        <span class="truncate">{{ pageName }}</span>
        <PencilIcon class="text-muted-foreground size-4 shrink-0" />
      </button>

      <div class="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" :disabled="!past.length" title="Undo (Ctrl Z)" aria-label="Undo" @click="undo">
          <Undo2Icon />
        </Button>
        <Button variant="ghost" size="icon-sm" :disabled="!future.length" title="Redo (Ctrl ⇧ Z)" aria-label="Redo" class="max-sm:hidden" @click="redo">
          <Redo2Icon />
        </Button>
        <span class="bg-border mx-1 h-5 w-px max-sm:hidden" />
        <div role="tablist" class="kliping-segmented hidden items-center border p-0.5 lg:flex">
          <button
            v-for="w in WIDTHS"
            :key="w.id"
            type="button"
            role="tab"
            class="flex h-7 items-center gap-1 rounded-full px-2 text-xs"
            :class="widthMode === w.id ? 'bg-pill font-medium' : 'text-muted-foreground'"
            :aria-selected="widthMode === w.id"
            :title="w.label"
            @click="widthMode = w.id"
          >
            <component :is="w.icon" class="size-3.5" />
            <span class="hidden xl:inline">{{ w.label }}</span>
          </button>
        </div>
        <Button variant="ghost" size="icon-sm" :title="preview ? 'Exit preview (P)' : 'Full preview (P)'" :aria-pressed="preview" @click="preview = !preview">
          <EyeOffIcon v-if="preview" />
          <EyeIcon v-else />
        </Button>
        <Button variant="ghost" size="icon-sm" :title="dark ? 'Light preview' : 'Dark preview'" @click="dark = !dark">
          <SunIcon v-if="dark" />
          <MoonIcon v-else />
        </Button>
        <Button variant="ghost" size="icon-sm" title="Keyboard shortcuts (?)" class="hidden sm:inline-flex" @click="helpOpen = true">
          <KeyboardIcon />
        </Button>
        <span class="bg-border mx-1 h-5 w-px" />
        <Button v-if="stack.length" variant="ghost" size="sm" class="hidden sm:inline-flex" @click="copyCurrentLink">
          <CheckIcon v-if="linkCopied" />
          <LinkIcon v-else />
          {{ linkCopied ? 'Copied' : 'Copy link' }}
        </Button>
        <Button variant="ghost" size="sm" :disabled="!stack.length" @click="clearAll">
          Clear
        </Button>
        <Button size="sm" class="gap-1.5" :disabled="!stack.length" @click="setupOpen = true">
          <PackageIcon />
          Setup
        </Button>
      </div>
    </div>

    <div class="flex min-h-0 flex-1">
      <!-- Sidebar block. Layar sempit: panel penuh, dibuka tombol "Add block". -->
      <aside
        v-show="!preview"
        aria-label="Blocks"
        class="flex w-72 shrink-0 flex-col border-r bg-background xl:w-80"
        :class="libraryOpen ? 'max-md:fixed max-md:inset-x-0 max-md:top-[6.5rem] max-md:bottom-0 max-md:z-40 max-md:w-full' : 'max-md:hidden'"
      >
        <div class="flex items-center gap-2 p-3">
          <label class="relative block flex-1">
            <SearchIcon class="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <input v-model="query" type="search" placeholder="Search blocks…" aria-label="Search blocks" class="h-9 w-full rounded-md border bg-background pr-2 pl-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
          </label>
          <Button variant="ghost" size="icon-sm" class="md:hidden" aria-label="Close blocks" @click="libraryOpen = false">
            <XIcon />
          </Button>
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto px-3 pb-6">
          <template v-if="query.trim()">
            <p class="text-muted-foreground px-1 pb-2 text-xs">
              {{ results.length }} block{{ results.length === 1 ? '' : 's' }}
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="n in results"
                :key="n"
                type="button"
                draggable="true"
                class="group kliping-card flex cursor-grab flex-col overflow-hidden text-left active:cursor-grabbing"
                :title="`Drag or click to add ${n}`"
                @dragstart="startNew($event, n)"
                @click="addFromSidebar(n)"
              >
                <span class="relative aspect-[16/10] overflow-hidden border-b bg-muted/60">
                  <img :src="withBase(catalog.thumbnail(n, false))" :alt="n" loading="lazy" draggable="false" class="size-full object-cover object-top dark:hidden">
                  <img :src="withBase(catalog.thumbnail(n, true))" :alt="n" loading="lazy" draggable="false" class="hidden size-full object-cover object-top dark:block">
                </span>
                <span class="truncate px-2 py-1.5 font-mono text-xs">{{ n }}</span>
              </button>
            </div>
            <p v-if="!results.length" class="text-muted-foreground px-1 text-sm">
              No blocks match "{{ query }}".
            </p>
          </template>

          <template v-else>
            <div v-for="c in categories" :key="c.slug" class="border-b last:border-b-0">
              <button
                type="button"
                class="flex w-full items-center gap-2 px-1 py-2.5 text-left text-sm"
                :aria-expanded="openCategories.has(c.slug)"
                @click="toggleCategory(c.slug)"
              >
                <span class="flex-1 font-medium">{{ c.name }}</span>
                <span class="text-muted-foreground text-xs tabular-nums">{{ c.items.length }}</span>
                <ChevronDownIcon v-if="openCategories.has(c.slug)" class="text-muted-foreground size-4" />
                <ChevronRightIcon v-else class="text-muted-foreground size-4" />
              </button>
              <div v-if="openCategories.has(c.slug)" class="grid grid-cols-2 gap-2 pb-3">
                <button
                  v-for="n in c.items"
                  :key="n"
                  type="button"
                  draggable="true"
                  class="group kliping-card flex cursor-grab flex-col overflow-hidden text-left active:cursor-grabbing"
                  :title="`Drag or click to add ${n}`"
                  @dragstart="startNew($event, n)"
                  @click="addFromSidebar(n)"
                >
                  <span class="relative aspect-[16/10] overflow-hidden border-b bg-muted/60">
                    <img :src="withBase(catalog.thumbnail(n, false))" :alt="n" loading="lazy" draggable="false" class="size-full object-cover object-top dark:hidden">
                    <img :src="withBase(catalog.thumbnail(n, true))" :alt="n" loading="lazy" draggable="false" class="hidden size-full object-cover object-top dark:block">
                    <span class="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <PlusIcon class="size-5" />
                    </span>
                  </span>
                  <span class="truncate px-2 py-1.5 font-mono text-xs">{{ n }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </aside>

      <!-- Kanvas -->
      <main
        ref="canvasEl"
        class="min-w-0 flex-1 overflow-y-auto bg-muted/40"
        :class="preview ? 'p-0' : 'p-4 md:p-6'"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @click.self="selected = null"
      >
        <div
          v-if="!stack.length"
          class="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-20 text-center transition-colors"
          :class="dropIndex !== null ? 'border-primary bg-primary/5' : 'border-border bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,var(--muted)_10px,var(--muted)_11px)]'"
        >
          <span class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
            <PlusIcon class="size-5" />
          </span>
          <p class="text-primary font-medium">
            {{ dropIndex !== null ? 'Drop here' : 'Drag in your first block' }}
          </p>
          <p class="text-muted-foreground text-sm">
            Seret block dari sidebar ke sini — atau klik block-nya.
          </p>
          <div class="mt-2 flex flex-wrap justify-center gap-2">
            <Button size="sm" class="md:hidden" @click="libraryOpen = true">
              <PlusIcon /> Add block
            </Button>
            <Button variant="outline" size="sm" @click="loadSample">
              Start from a sample page
            </Button>
          </div>
        </div>

        <div v-else class="mx-auto flex flex-col transition-[width] duration-300" :style="{ width: frameWidth, maxWidth: '100%' }">
          <div
            v-for="(name, i) in stack"
            :id="`builder-row-${i}`"
            :key="keys[i]"
            data-builder-row
            class="group/row relative bg-background"
            :class="!preview && (selected === i ? 'z-10 outline-2 outline-primary' : 'hover:outline hover:outline-primary/50')"
          >
            <!-- Penanda jatuh di atas baris ini -->
            <div v-if="dropIndex === i" class="pointer-events-none absolute -top-px right-0 left-0 z-30 h-0.5 bg-primary">
              <span class="bg-primary text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 font-medium text-xs">Drop here</span>
            </div>
            <div v-if="dropIndex === stack.length && i === stack.length - 1" class="pointer-events-none absolute right-0 -bottom-px left-0 z-30 h-0.5 bg-primary">
              <span class="bg-primary text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-0.5 font-medium text-xs">Drop here</span>
            </div>

            <!-- Label & toolbar section -->
            <div
              v-if="!preview"
              class="absolute top-0 left-0 z-20 flex items-center gap-0.5 rounded-br-md bg-primary pr-1 pl-0.5 text-primary-foreground text-xs transition-opacity"
              :class="selected === i ? 'opacity-100' : 'opacity-0 group-hover/row:opacity-100 focus-within:opacity-100'"
            >
              <span
                draggable="true"
                class="flex cursor-grab items-center px-0.5 py-1 active:cursor-grabbing"
                :aria-label="`Drag ${name}`"
                title="Drag to reorder"
                @dragstart="startRow($event, i)"
              >
                <GripVerticalIcon class="size-3.5" />
              </span>
              <span class="font-mono font-medium">{{ name }}</span>
              <span class="opacity-75">/ {{ categoryName(name) }}</span>
              <a :href="withBase(catalog.detailPage(name))" target="_blank" rel="noreferrer" class="p-1 text-primary-foreground" :aria-label="`Open ${name}`" title="Open block page">
                <ArrowUpRightIcon class="size-3.5" />
              </a>
              <select
                class="ml-1 max-w-28 rounded border-0 bg-primary-foreground/15 px-1 py-0.5 text-xs text-primary-foreground"
                :value="name"
                :aria-label="`Replace ${name}`"
                title="Replace with another block of this kind"
                @change="replaceRow(i, ($event.target as HTMLSelectElement).value)"
              >
                <option v-for="s in siblingsOf(name)" :key="s" :value="s" class="text-foreground">
                  {{ s }}
                </option>
              </select>
              <button type="button" class="p-1 disabled:opacity-40" :disabled="i === 0" :aria-label="`Move ${name} up`" title="Move up (Alt ↑)" @click="moveRow(i, i - 1)">
                <ArrowUpIcon class="size-3.5" />
              </button>
              <button type="button" class="p-1 disabled:opacity-40" :disabled="i === stack.length - 1" :aria-label="`Move ${name} down`" title="Move down (Alt ↓)" @click="moveRow(i, i + 1)">
                <ArrowDownIcon class="size-3.5" />
              </button>
              <button type="button" class="p-1" :aria-label="`Duplicate ${name}`" title="Duplicate (D)" @click="duplicateRow(i)">
                <CopyPlusIcon class="size-3.5" />
              </button>
              <button type="button" class="p-1" :aria-label="`Remove ${name}`" title="Remove (Delete)" @click="removeRow(i)">
                <Trash2Icon class="size-3.5" />
              </button>
            </div>

            <iframe
              data-builder-frame
              :src="withBase(catalog.canvas(name))"
              :title="name"
              loading="lazy"
              class="block w-full border-0"
              :style="{ height: heights[keys[i]!] ?? catalog.height(name) }"
              @load="onFrameLoad($event, keys[i]!)"
            />
            <!-- Mode sunting: lapisan ini menangkap klik (pilih) dan seret,
                 yang kalau tidak akan ditelan iframe. Pratinjau penuh
                 melepasnya supaya block bisa dicoba. -->
            <div v-if="!preview" class="absolute inset-0 cursor-pointer" @click="selected = i" />
          </div>
        </div>
      </main>
      <Button
        v-if="stack.length && !preview && !libraryOpen"
        class="fixed right-4 bottom-4 z-30 rounded-full shadow-lg md:hidden"
        @click="libraryOpen = true"
      >
        <PlusIcon /> Add block
      </Button>
    </div>

    <Dialog v-model:open="setupOpen">
      <DialogContent class="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Setup</DialogTitle>
          <DialogDescription>
            Satu perintah memasang {{ new Set(stack).size }} block dan menulis
            <code>src/{{ fileName }}</code> yang merender semuanya sesuai urutan di Builder.
          </DialogDescription>
        </DialogHeader>
        <PackageCommand :command="command" />
        <p class="text-sm">
          Lalu tampilkan halamannya dari <code>src/App.vue</code>:
        </p>
        <div class="relative">
          <pre class="max-h-64 overflow-auto rounded-lg bg-(--code) p-4 font-mono text-(--code-foreground) text-xs leading-relaxed"><code>{{ appCode }}</code></pre>
          <Button variant="ghost" size="icon-sm" class="absolute top-2 right-2" :aria-label="codeCopied ? 'Copied' : 'Copy App.vue'" @click="copyCode(appCode)">
            <CheckIcon v-if="codeCopied" />
            <CopyIcon v-else />
          </Button>
        </div>
        <p class="text-muted-foreground text-xs">
          Di Nuxt, ganti <code>src/{{ fileName }}</code> dengan <code>app/pages/index.vue</code>.
          Belum ada project? Jalankan <code>npx kliping@latest init</code> dulu —
          <a :href="withBase('/installation')" class="underline underline-offset-4">lihat Installation</a>.
          Tautan Builder ini menyimpan susunannya; bagikan untuk membukanya lagi.
        </p>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="helpOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Klik sebuah section untuk memilihnya.</DialogDescription>
        </DialogHeader>
        <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <template v-for="[keysLabel, label] in SHORTCUTS" :key="keysLabel">
            <dt><kbd class="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">{{ keysLabel }}</kbd></dt>
            <dd class="text-muted-foreground">
              {{ label }}
            </dd>
          </template>
        </dl>
      </DialogContent>
    </Dialog>
  </div>
</template>
