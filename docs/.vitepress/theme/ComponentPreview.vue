<script setup lang="ts">
import type { Component } from 'vue'
import { withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import hookGallery from '@/registry/hook-gallery.json'

const props = defineProps<{
  name: string
  class?: string
  previewClass?: string
  align?: 'start' | 'center' | 'end'
  /**
   * `"none"` mematikan penyisipan kode sumber demonya saat build.
   *
   * Dibaca aturan markdown di `config.ts`, dan dideklarasikan di sini supaya
   * atributnya tidak lolos ke DOM sebagai `code="none"` pada halaman yang
   * kebetulan tidak lewat aturan itu.
   */
  code?: string
}>()

/**
 * Markdown merujuk contoh lewat namanya saja, jadi pemetaan nama ke komponen
 * disusun dari isi folder, bukan dari daftar impor yang harus ditulis manual.
 *
 * Diambil eager supaya isinya ikut ter-render saat build: kalau dimuat malas,
 * halaman statisnya keluar kosong dan contohnya baru muncul setelah JavaScript
 * jalan di peramban.
 */
function mapModules(modules: Record<string, any>, name: (path: string) => string) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, m]) => [name(path), m.default as Component]),
  )
}

const chartModules = import.meta.glob('@/charts/*.vue', { eager: true })

const examples: Record<string, Component> = {
  ...mapModules(
    import.meta.glob('@/demo/*.vue', { eager: true }),
    j => j.split('/').pop()!.replace(/\.vue$/, ''),
  ),
  ...mapModules(chartModules, j => j.split('/').pop()!.replace(/\.vue$/, '')),
}

/**
 * Grafik hanya digambar di peramban.
 *
 * Unovis menentukan ukuran gambarnya dari elemen yang menampungnya. Di server
 * tidak ada elemen yang bisa diukur, jadi yang keluar SVG berukuran bawaan —
 * lalu di peramban diukur ulang dan digambar dengan ukuran yang berbeda. Vue
 * membaca selisih itu sebagai hidrasi yang tidak cocok, membuang hasil render
 * server di bagian itu, dan menggambar ulang.
 *
 * Dibungkus `<ClientOnly>`, tidak ada yang perlu dicocokkan. Yang hilang dari
 * halaman statisnya cuma gambar grafiknya; judul, keterangan, dan kodenya tetap
 * ada di HTML.
 */
const chartNames = new Set(Object.keys(chartModules).map(j => j.split('/').pop()!.replace(/\.vue$/, '')))

// Sebagian contoh grafik tinggal di folder demo, bukan folder chart — yang
// dipakai halaman komponen Chart untuk menjelaskan bagian-bagiannya. Namanya
// yang menandai, karena itu satu-satunya yang membedakannya di sana.
function isChart(name: string) {
  return chartNames.has(name) || name.startsWith('Chart')
}

/**
 * Demo composable juga digambar di peramban saja: yang diperagakannya API
 * peramban — waktu, media query, judul tab, papan klip — dan nilai yang
 * dihitung server untuknya pasti berbeda, jadi hidrasinya selalu berselisih.
 */
const hookDemos = new Set(Object.values(hookGallery.demo))
const clientOnly = (name: string) => isChart(name) || hookDemos.has(name)

/**
 * Nama block, dikenali dari folder yang punya `page.vue`.
 *
 * Block tidak dirender langsung di dalam halaman. Sebuah block adalah halaman
 * utuh, dan sebagiannya — sidebar, misalnya — memakai posisi `fixed`, yang lolos
 * dari `overflow-hidden` mana pun. Dirender inline, sidebar demo di halaman
 * Sidebar keluar dari kotak pratinjaunya dan menimpa sidebar dokumentasi.
 *
 * Jadi block dibingkai iframe ke halaman kanvasnya sendiri — cara yang sama
 * dengan yang dipakai galeri block, dan sama dengan yang dilakukan upstream.
 */
const blockNames = new Set(
  Object.keys(import.meta.glob('@/blocks/*/page.vue')).map(j => j.split('/').slice(-2)[0]),
)

const isBlock = computed(() => blockNames.has(props.name))
const component = computed(() => examples[props.name])

/**
 * Block dibingkai pada lebar desktop lalu diperkecil, bukan dipaskan ke lebar
 * kolom dokumentasi.
 *
 * Bukan cuma soal tampilan. Sidebar membaca lebar layar lewat media query: di
 * iframe selebar kolom teks ia menganggap dirinya di ponsel, sementara render
 * di server tidak — dan hidrasinya jadi tidak cocok. Diberi lebar desktop,
 * keduanya sepakat.
 */
const WIDTH = 1440
const HEIGHT = 900

const container = ref<HTMLElement>()
const scale = ref(0.45)
let observer: ResizeObserver | undefined

function measure() {
  const width = container.value?.clientWidth
  if (width)
    scale.value = width / WIDTH
}

onMounted(() => {
  if (!isBlock.value)
    return
  measure()
  observer = new ResizeObserver(measure)
  if (container.value)
    observer.observe(container.value)
})

onBeforeUnmount(() => observer?.disconnect())

const alignClass = computed(() => ({
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}[props.align ?? 'center']))

/**
 * Kode sumbernya diambil dari `/code/<name>.html`, bukan disisipkan ke halaman.
 *
 * Bentuknya tidak berubah: pratinjau dan kode sama-sama tampil, kodenya dipotong
 * pendek lalu dipudarkan, dan tombol membukanya penuh. Yang berubah dari mana
 * markupnya datang.
 *
 * Dulu disisipkan saat build sebagai isi slot. Itu yang membuat `docs:build`
 * kehabisan memori: satu demo yang disorot ± 50 KB HTML penuh `<span>`, dan
 * halaman yang memuat sebelas demo menghasilkan chunk 591 KB yang ditahan Rollup
 * sampai build selesai — dua kali, karena VitePress memancarkan varian `.lean`
 * dan isi statis di dalam slot komponen tidak bisa dibuangnya dari sana.
 *
 * Diambil saat terpasang, bukan saat tombolnya ditekan, supaya potongan
 * teasernya tetap terlihat seperti sebelumnya.
 */
const codeOpen = ref(false)
const html = ref('')
const failed = ref(false)

const hasCode = computed(() => props.code !== 'none')

onMounted(async () => {
  if (!hasCode.value)
    return

  try {
    const response = await fetch(withBase(`/code/${props.name}.html`))
    if (!response.ok)
      throw new Error(String(response.status))
    html.value = await response.text()
  }
  catch {
    // Kodenya tidak ada atau gagal diambil. Pratinjaunya tetap tampil — yang
    // hilang cuma bagian kodenya, dan itu jauh lebih baik daripada halaman yang
    // ikut kosong karena satu berkas tidak ketemu.
    failed.value = true
  }
})
</script>

<template>
  <div
    data-slot="component-preview"
    :class="cn(
      'kliping-preview group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-lg border',
      props.class,
    )"
  >
    <div class="w-full">
      <div
        v-if="isBlock"
        ref="container"
        class="relative w-full overflow-hidden"
        :style="{ height: `${HEIGHT * scale}px` }"
      >
        <iframe
          :src="withBase(`/view/${name}`)"
          :title="name"
          loading="lazy"
          :width="WIDTH"
          :height="HEIGHT"
          class="absolute top-0 left-0 origin-top-left border-0"
          :style="{ transform: `scale(${scale})` }"
        />
      </div>
      <!-- Kelas `preview` bukan hiasan: halaman markdown mengatur kotak ini
           dari luar lewat selektor seperti `[&_.preview]:p-4` dan
           `**:[.preview]:min-h-[400px]`, persis seperti di hulu. Tanpa kelas
           itu, semua pengaturan tersebut diam-diam tidak kena sasaran.

           Tinggi minimum, bukan tinggi tetap — dan ini memang berbeda dari
           hulu. Di sana kotaknya `h-72`: 288 piksel dikurangi padding 40 atas
           dan bawah, jadi hanya 208 piksel yang tersisa untuk isinya. Demo yang
           lebih tinggi dari itu — kartu login, kalender, tabel — terpotong rata
           di atas dan di bawah sekaligus, karena isinya dipusatkan. Menyalin
           perilaku itu berarti menyalin contoh yang tidak bisa dilihat utuh.
           Dengan `min-h-72`, demo pendek tetap mendapat kotak selega hulu dan
           demo tinggi tumbuh mengikuti isinya. -->
      <div
        v-else
        data-slot="preview"
        :class="cn(
          'preview relative flex min-h-72 w-full justify-center p-10',
          alignClass,
          previewClass,
        )"
      >
        <ClientOnly v-if="component && clientOnly(name)">
          <component :is="component" />
        </ClientOnly>
        <component :is="component" v-else-if="component" />
        <p v-else class="text-muted-foreground self-center text-sm">
          Demo <code>{{ name }}</code> is not available yet.
        </p>
      </div>
    </div>

    <div v-if="hasCode && html && !failed" class="kliping-preview-code relative overflow-hidden" :data-open="codeOpen">
      <div class="relative" :class="!codeOpen && 'h-[7rem]'">
        <div class="vp-doc" v-html="html" />
        <div v-if="!codeOpen" class="absolute inset-0 z-10 flex items-center justify-center pb-4">
          <div class="kliping-preview-fade absolute inset-0" />
          <Button
            type="button"
            size="sm"
            variant="outline"
            class="relative z-10 rounded-lg shadow-none"
            @click="codeOpen = true"
          >
            View Code
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
