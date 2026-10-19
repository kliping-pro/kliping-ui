<script setup lang="ts">
import {
  CheckIcon,
  ExpandIcon,
  MonitorIcon,
  RotateCwIcon,
  SmartphoneIcon,
  TabletIcon,
  TerminalIcon,
} from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { GalleryKind } from './gallery'
import AddToSetup from './AddToSetup.vue'
import BlockCode from './BlockCode.vue'
import { CATALOG, installCommand } from './gallery'
import { chartSlug } from '@/lib/blocks'

/**
 * Pratinjau satu block, lengkap dengan bilah alatnya.
 *
 * Pratinjaunya iframe ke halaman kanvas block — halaman yang memang sudah ada
 * dan sudah statis. Bukan cuma soal kerapian: block adalah halaman utuh yang
 * sebagian memakai posisi `fixed` dan membaca lebar layar lewat media query.
 * Dirender langsung di dalam halaman, keduanya salah — ia lolos dari kotaknya,
 * dan menganggap dirinya di ponsel.
 *
 * Tab Kode-nya `BlockCode.vue`, yang baru mengambil kodenya saat tab itu
 * dibuka. Iframe-nya menunjuk `/view/<nama>`, kanvas polosnya; `/blocks/<nama>`
 * adalah halaman detail satu block.
 *
 * Dulu disisipkan sebagai isi slot saat build. Itu yang membuat `docs:build`
 * kehabisan memori: satu halaman galeri memuat sampai delapan belas block, dan
 * seluruh sumbernya yang sudah disorot ikut jadi bagian modul JavaScript halaman
 * itu — ditahan Rollup sampai build selesai, dua kali, karena varian `.lean`
 * tidak bisa membuang isi statis yang berada di dalam slot komponen.
 *
 * Grafik memakainya juga, lewat `kind="chart"`: kanvas, kode, dan tingginya
 * dibaca dari `CATALOG`, dan `uses` adalah komponen yang diimpornya.
 */
const props = withDefaults(
  defineProps<{ name: string, kind?: GalleryKind, uses?: string[] }>(),
  { kind: 'block', uses: () => [] },
)

const catalog = computed(() => CATALOG[props.kind])
const tab = ref<'preview' | 'code'>('preview')

const height = computed(() => catalog.value.height(props.name))
const reloadKey = ref(0)
const widthPercent = ref(100)

/**
 * Bingkainya yang menyempit, bukan gambarnya yang menyusut.
 *
 * Versi pertama memperkecil seluruh pratinjau dengan `transform: scale()` — satu
 * render selebar 1440 piksel, lalu dikecilkan. Hasilnya terlihat seperti
 * pratinjau ponsel padahal bukan: susunannya persis sama dengan versi desktop,
 * cuma lebih kecil. Justru kebalikan dari gunanya. Yang ingin dilihat pembaca
 * adalah bagaimana block menyusun ulang dirinya di layar sempit — sidebar yang
 * melipat, kartu yang menumpuk — dan itu tidak akan pernah muncul kalau
 * lebarnya tidak benar-benar berubah.
 *
 * Sekarang iframe-nya mengisi panel pada lebar aslinya, dan panel itu yang
 * diubah ukurannya. Di dalam iframe, media query membaca lebar yang sungguhan,
 * jadi block-nya menata ulang dirinya betulan. Gagangnya bisa ditarik untuk
 * lebar apa pun di antaranya, sama seperti di hulu.
 *
 * Penggesernya ditulis sendiri, bukan memakai komponen Resizable yang sudah ada
 * di `src/`. Bukan karena komponen itu kurang: ia menghitung lebar panelnya dari
 * pengukuran tata letak, dan di server tidak ada tata letak untuk diukur, jadi
 * bentuk yang dikirim server berbeda dari yang digambar peramban — Vue
 * melaporkannya sebagai hidrasi yang tidak cocok di seluruh halaman ini. Di sini
 * lebarnya cuma sebuah persentase pada `style`, sama persis di kedua sisi.
 */
const container = ref<HTMLElement>()
const panel = ref<HTMLElement>()
const dragging = ref(false)

const MIN = 25

function setWidth(percent: number) {
  widthPercent.value = percent
  tab.value = 'preview'
}

/**
 * Menarik gagangnya — dibuat supaya terasa ringan, bukan patah-patah.
 *
 * Tiga hal yang membuat versi lama tersendat, dan yang ditangani di sini:
 *
 * 1. Begitu kursor melintas di atas iframe, iframe-nya yang menerima gerakan
 *    mouse, bukan halaman ini — gagangnya berhenti lalu melompat. Selama
 *    menyeret, iframe ditutup lapisan transparan dan pointer-nya ditangkap
 *    gagang (`setPointerCapture`), jadi tidak ada gerakan yang hilang.
 * 2. Tiap `pointermove` langsung memperbarui state Vue. Gerakan mouse bisa
 *    datang ratusan kali per detik; yang perlu digambar cuma satu kali per
 *    frame. Lebarnya ditulis langsung ke elemen di dalam
 *    `requestAnimationFrame`, dan state Vue baru diperbarui saat dilepas.
 * 3. Gagangnya selebar 12 piksel dengan garis 6 piksel — susah dikenai.
 *    Sekarang area genggamnya 16 piksel setinggi panel, dengan pegangan yang
 *    membesar saat disentuh.
 *
 * Pointer, bukan mouse: satu jalur yang sama untuk kursor, jari, dan pena.
 */
function startDrag(start: PointerEvent) {
  const box = container.value?.getBoundingClientRect()
  const el = panel.value
  if (!box || !el || start.button !== 0)
    return

  start.preventDefault()
  const handle = start.currentTarget as HTMLElement
  handle.setPointerCapture(start.pointerId)
  dragging.value = true

  let target = widthPercent.value
  let frame = 0

  const draw = () => {
    frame = 0
    el.style.width = `${target}%`
  }

  const move = (e: PointerEvent) => {
    target = Math.min(100, Math.max(MIN, ((e.clientX - box.left) / box.width) * 100))
    if (!frame)
      frame = requestAnimationFrame(draw)
  }

  const release = () => {
    if (frame)
      cancelAnimationFrame(frame)
    draw()
    widthPercent.value = Math.round(target * 10) / 10
    dragging.value = false
    handle.removeEventListener('pointermove', move)
    handle.removeEventListener('pointerup', release)
    handle.removeEventListener('pointercancel', release)
    document.body.style.removeProperty('user-select')
    document.body.style.removeProperty('cursor')
  }

  // Tanpa ini, menyeret ke kiri malah menyorot teks di sepanjang halaman.
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
  handle.addEventListener('pointermove', move)
  handle.addEventListener('pointerup', release)
  handle.addEventListener('pointercancel', release)
}

/** Panah kiri-kanan menggeser 5%, Home/End ke ujung — gagangnya bisa dipakai tanpa mouse. */
function handleKey(e: KeyboardEvent) {
  const step = { ArrowLeft: -5, ArrowRight: 5 }[e.key as 'ArrowLeft' | 'ArrowRight']
  if (step) {
    e.preventDefault()
    widthPercent.value = Math.min(100, Math.max(MIN, widthPercent.value + step))
  }
  else if (e.key === 'Home' || e.key === 'End') {
    e.preventDefault()
    widthPercent.value = e.key === 'Home' ? MIN : 100
  }
}

const { copy, copied } = useClipboard()
const command = computed(() => installCommand(props.kind, props.name, props.uses))
</script>

<template>
  <div :id="name" class="kliping-block-viewer scroll-mt-24">
    <div class="flex flex-col gap-3 md:flex-row md:items-center">
      <Tabs v-model="tab">
        <TabsList class="kliping-segmented grid h-8 grid-cols-2 items-center p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs">
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Separator orientation="vertical" class="mx-2 hidden !h-4 md:block" />

      <a :href="`#${name}`" class="text-foreground flex-1 text-sm font-medium no-underline hover:underline">
        {{ catalog.description(name).replace(/\.$/, '') || catalog.label(name) }}
      </a>

      <div class="ml-auto flex items-center gap-2">
        <div class="kliping-segmented hidden h-8 items-center gap-1 border p-1 lg:flex">
          <Button
            v-for="p in [{ n: 100, i: MonitorIcon, t: 'Desktop' }, { n: 60, i: TabletIcon, t: 'Tablet' }, { n: 30, i: SmartphoneIcon, t: 'Mobile' }]"
            :key="p.n"
            size="icon"
            variant="ghost"
            class="size-6 p-0"
            :class="widthPercent === p.n && 'bg-accent'"
            :title="p.t"
            @click="setWidth(p.n)"
          >
            <component :is="p.i" />
            <span class="sr-only">{{ p.t }}</span>
          </Button>
          <Separator orientation="vertical" class="!h-4" />
          <Button size="icon" variant="ghost" class="size-6 p-0" title="Open in new tab" as-child>
            <a :href="withBase(catalog.detailPage(name))" target="_blank" rel="noreferrer" :title="`Open ${catalog.singular} page`">
              <ExpandIcon />
              <span class="sr-only">Open in new tab</span>
            </a>
          </Button>
          <Separator orientation="vertical" class="!h-4" />
          <Button
            size="icon"
            variant="ghost"
            class="size-6 p-0"
            title="Refresh preview"
            @click="reloadKey++"
          >
            <RotateCwIcon />
            <span class="sr-only">Refresh preview</span>
          </Button>
        </div>

        <AddToSetup :name="kind === 'chart' ? chartSlug(name) : name" size="icon-sm" />
        <Button variant="outline" size="sm" class="w-fit gap-1 px-2.5 shadow-none" @click="copy(command)">
          <CheckIcon v-if="copied" />
          <TerminalIcon v-else />
          <span class="hidden sm:inline">{{ command.replace('@latest', '') }}</span>
          <span class="sm:hidden">Copy command</span>
        </Button>
      </div>
    </div>

    <div v-show="tab === 'preview'" class="relative mt-3" :style="{ height }">
      <!-- Petak titik-titik di belakang panel: penanda bahwa ruang di sebelah
           kanan memang sengaja kosong, bukan pratinjau yang gagal dimuat. -->
      <div class="absolute inset-0 rounded-lg [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div ref="container" class="relative z-10 flex h-full">
        <!-- Lebarnya beranimasi saat dipilih lewat tombol Desktop/Tablet/Mobile,
             tapi tidak saat diseret — di sana yang dicari justru langsung
             mengikuti tangan. -->
        <div
          ref="panel"
          class="bg-background relative h-full overflow-hidden rounded-lg border"
          :class="!dragging && 'transition-[width] duration-300 ease-out'"
          :style="{ width: `${widthPercent}%` }"
        >
          <iframe
            :key="reloadKey"
            :src="withBase(catalog.canvas(name))"
            :title="catalog.label(name)"
            loading="lazy"
            class="size-full border-0"
          />
          <!-- Penutup selama menyeret: tanpa ini iframe menelan gerakan mouse. -->
          <div v-if="dragging" class="absolute inset-0 cursor-col-resize" />
        </div>

        <div
          class="group/handle relative hidden w-4 shrink-0 cursor-col-resize touch-none outline-none lg:block"
          role="separator"
          tabindex="0"
          aria-orientation="vertical"
          :aria-valuenow="Math.round(widthPercent)"
          :aria-valuemin="MIN"
          aria-valuemax="100"
          aria-label="Preview width"
          title="Drag to resize · double-click to reset"
          @pointerdown="startDrag"
          @dblclick="widthPercent = 100"
          @keydown="handleKey"
        >
          <div
            class="absolute top-1/2 left-1/2 h-10 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 group-hover/handle:h-14 group-hover/handle:w-2 group-hover/handle:bg-muted-foreground/60 group-focus-visible/handle:ring-2 group-focus-visible/handle:ring-ring/50"
            :class="dragging ? '!h-16 !w-2 !bg-primary' : 'bg-border'"
          />
        </div>
      </div>
    </div>

    <BlockCode
      v-show="tab === 'code'"
      class="mt-3"
      :style="{ height }"
      :name="name"
      :folder="catalog.codeFolder"
      :active="tab === 'code'"
    />
  </div>
</template>
