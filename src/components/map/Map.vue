<script setup lang="ts">
import type MapLibreGL from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import type { MapLibreModule } from './context'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { cn } from '@/lib/utils'
import { provideMapContext } from './context'

/**
 * Akar peta MapLibre.
 *
 * `maplibre-gl` beserta CSS-nya dimuat lewat `import()` di dalam `onMounted`,
 * tidak di puncak berkas. Alasannya dua: modul itu menyentuh `window` begitu
 * dievaluasi, yang meledakkan prerender SSR; dan semua demo diimpor serentak
 * oleh dokumentasi, jadi impor statis akan ikut terkirim di setiap halaman.
 *
 * Anak-anaknya baru dirender setelah peta selesai memuat gaya — sebelum itu
 * belum ada yang bisa mereka tempeli penanda atau layer.
 */
const props = withDefaults(defineProps<{
  /** Initial map center as [longitude, latitude]. */
  center?: [number, number]
  /** Initial zoom level. */
  zoom?: number
  /** Lowest zoom level the map can be zoomed out to. */
  minZoom?: number
  /** Highest zoom level the map can be zoomed in to. */
  maxZoom?: number
  /** Map style URL or spec per theme; defaults to the OpenFreeMap Positron and Dark styles. */
  styles?: {
    light?: string | MapLibreGL.StyleSpecification
    dark?: string | MapLibreGL.StyleSpecification
  }
  // Pengganti `...props` di sumbernya.
  /** Additional `maplibregl.Map` options. */
  options?: Omit<MapLibreGL.MapOptions, 'container' | 'style' | 'center' | 'zoom' | 'minZoom' | 'maxZoom'>
  class?: HTMLAttributes['class']
}>(), {
  center: () => [-122.4194, 37.7749],
  zoom: 12,
  minZoom: 0,
  maxZoom: 22,
})

// OpenFreeMap — ubin gratis tanpa kunci API (https://openfreemap.org, MIT).
const LIGHT_STYLE = 'https://tiles.openfreemap.org/styles/positron'
const DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark'

const container = ref<HTMLDivElement>()
const mapInstance = shallowRef<MapLibreGL.Map | null>(null)
const library = shallowRef<MapLibreModule | null>(null)
const loaded = ref(false)
const styleVersion = ref(0)

provideMapContext({ map: mapInstance, isLoaded: loaded, maplibre: library, styleVersion })

let observer: MutationObserver | null = null
let unmounted = false

function currentTheme(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function styleFor(t: 'dark' | 'light') {
  return t === 'dark'
    ? props.styles?.dark || DARK_STYLE
    : props.styles?.light || LIGHT_STYLE
}

/**
 * Gaya MapLibre disuntikkan sebagai `<style>`, bukan diimpor sebagai CSS.
 *
 * Impor CSS biasa — statis maupun dinamis — dilebur build ke stylesheet
 * global, dan 60 KB gaya peta lalu ikut terunduh di setiap halaman. Berkas CSS
 * terpisah (`?url`) juga bukan jalan: VitePress menganggap berkas CSS pertama
 * hasil build sebagai stylesheet situsnya. Dengan `?inline` gayanya ikut di
 * chunk JavaScript yang baru dimuat saat ada peta yang dipasang.
 */
async function injectMapLibreCss() {
  const { default: css } = await import('maplibre-gl/dist/maplibre-gl.css?inline')
  if (document.querySelector('style[data-maplibre-css]'))
    return
  const styleEl = Object.assign(document.createElement('style'), { textContent: css })
  styleEl.dataset.maplibreCss = ''
  document.head.append(styleEl)
}

onMounted(async () => {
  const [mod] = await Promise.all([import('maplibre-gl'), injectMapLibreCss()])
  // Komponennya bisa sudah dilepas selama menunggu impor.
  if (unmounted || !container.value) return

  // Berkas UMD: hasil impornya kadang modul, kadang dibungkus `default`.
  const lib = ((mod as { default?: MapLibreModule }).default ?? mod) as MapLibreModule
  library.value = lib

  let activeTheme = currentTheme()
  const instance = new lib.Map({
    container: container.value,
    style: styleFor(activeTheme),
    center: props.center,
    zoom: props.zoom,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
    ...props.options,
  })
  mapInstance.value = instance

  instance.on('style.load', () => {
    styleVersion.value++
  })
  instance.on('load', () => {
    loaded.value = true
  })

  // Situs ini mengganti tema dengan kelas `dark` di <html>. Sumbernya memanggil
  // `setStyle` pada setiap perubahan kelas; di sini hanya saat temanya benar
  // berganti, karena tiap `setStyle` mengunduh dan menggambar ulang seluruh gaya.
  observer = new MutationObserver(() => {
    const t = currentTheme()
    if (t === activeTheme) return
    activeTheme = t
    instance.setStyle(styleFor(t))
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

// `onUnmounted`, bukan `onBeforeUnmount`: anak-anaknya harus sempat mencopot
// penanda dan layer mereka selagi petanya masih hidup.
onUnmounted(() => {
  unmounted = true
  observer?.disconnect()
  observer = null
  if (mapInstance.value) {
    try {
      mapInstance.value.remove()
    }
    catch (error) {
      // Pembongkaran di tengah unduhan melempar galat "aborted" yang tidak berarti.
      if (error instanceof Error && !error.message.includes('aborted'))
        console.error('Failed to tear down the map:', error)
    }
  }
  mapInstance.value = null
  loaded.value = false
})
</script>

<template>
  <div ref="container" :class="cn('relative h-full w-full', props.class)" data-slot="map">
    <slot v-if="loaded" />
  </div>
</template>

<style>
/* Popup bawaan MapLibre punya latar, bayangan, dan ekor sendiri; isinya di sini
   sudah membawa gaya Tailwind, jadi bungkus bawaannya dikosongkan. */
.maplibregl-popup-content {
  background: transparent !important;
  padding: 0 !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.maplibregl-popup-tip {
  display: none !important;
}

/* Variabel warna di sini oklch utuh, bukan triplet HSL — jadi tanpa `hsl()`. */
.maplibregl-popup-close-button {
  color: var(--foreground) !important;
  font-size: 20px !important;
  padding: 0 4px !important;
  right: 4px !important;
  top: 4px !important;
}
</style>
