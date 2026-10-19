import type MapLibreGL from 'maplibre-gl'
import type { Ref, ShallowRef } from 'vue'
import { createContext } from '@/lib/create-context'

/** The whole `maplibre-gl` module, lazy-loaded by `Map` and shared through context. */
export type MapLibreModule = typeof MapLibreGL

export interface MapContext {
  map: ShallowRef<MapLibreGL.Map | null>
  isLoaded: Ref<boolean>
  // Bagian lain butuh konstruktor `Marker`, `Popup`, dan `LngLat`, tapi tidak
  // boleh mengimpor `maplibre-gl` sendiri: impor statis itu menyentuh `window`
  // saat SSR. Jadi modul yang sudah dimuat `Map` ikut diteruskan.
  /** The loaded `maplibre-gl` module. */
  maplibre: ShallowRef<MapLibreModule | null>
  // `setStyle` saat tema berganti membuang semua source dan layer tambahan;
  // rute dan klaster membaca angka ini supaya tahu kapan harus memasang
  // dirinya lagi.
  /** Increments every time the map style finishes loading. */
  styleVersion: Ref<number>
}

export interface MapMarkerContext {
  marker: ShallowRef<MapLibreGL.Marker | null>
  markerElement: ShallowRef<HTMLDivElement | null>
}

export const [provideMapContext, injectMapContext, injectMapContextOptional] = createContext<MapContext>('Map')
export const [provideMapMarkerContext, injectMapMarkerContext, injectMapMarkerContextOptional] = createContext<MapMarkerContext>('MapMarker')

/** Access the map instance from any component inside `Map`. */
export function useMap() {
  return injectMapContext('useMap')
}

// Peta mungkin sudah dibongkar lebih dulu.
/** Runs a cleanup that is allowed to fail. */
export function safely(fn: () => void) {
  try {
    fn()
  }
  catch {}
}

export type LabelPosition = 'top' | 'bottom' | 'left' | 'right'
export type ControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
