<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ControlPosition } from './context'
import { LocateIcon, Maximize2Icon, MinusIcon, NavigationIcon, PlusIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { useMap } from './context'

/**
 * Tombol zoom, kompas, lokasi, dan layar penuh.
 *
 * Kontrol bawaan MapLibre tidak dipakai: tampilannya tidak mengikuti token
 * warna situs ini. Tombol biasa yang memanggil API petanya lebih mudah
 * diselaraskan.
 */
const props = withDefaults(defineProps<{
  /** Map corner for the controls: top-left, top-right, bottom-left, or bottom-right. */
  position?: ControlPosition
  /** Shows the zoom in and zoom out buttons. */
  showZoom?: boolean
  /** Shows a button that resets the bearing to north. */
  showCompass?: boolean
  /** Shows a button that flies to the user's location and emits locate. */
  showLocate?: boolean
  /** Shows a button that toggles fullscreen for the map container. */
  showFullscreen?: boolean
  class?: HTMLAttributes['class']
}>(), {
  position: 'bottom-right',
  showZoom: true,
  showCompass: false,
  showLocate: false,
  showFullscreen: false,
})

const emit = defineEmits<{
  /** The locate button found the user; with their coordinates. */
  locate: [coords: { lng: number, lat: number }]
}>()

const { map } = useMap()

const positionClasses: Record<ControlPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

const buttonClass = 'flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background shadow-md transition-colors hover:bg-accent hover:text-accent-foreground'

function locate() {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = { lng: position.coords.longitude, lat: position.coords.latitude }
      map.value?.flyTo({ center: [coords.lng, coords.lat], zoom: 14 })
      emit('locate', coords)
    },
    (error) => {
      console.error('Failed to get the location:', error)
    },
  )
}

function toggleFullscreen() {
  const container = map.value?.getContainer()
  if (!container) return
  if (!document.fullscreenElement)
    container.requestFullscreen()
  else
    document.exitFullscreen()
}
</script>

<template>
  <div
    :class="cn('absolute z-10 flex flex-col gap-2', positionClasses[props.position], props.class)"
    data-slot="map-controls"
  >
    <div v-if="props.showZoom" class="flex flex-col overflow-hidden rounded-lg border border-border bg-background shadow-md">
      <button
        aria-label="Zoom in"
        class="flex h-8 w-8 items-center justify-center border-b transition-colors hover:bg-accent hover:text-accent-foreground"
        type="button"
        @click="map?.zoomIn()"
      >
        <PlusIcon class="h-4 w-4" />
      </button>
      <button
        aria-label="Zoom out"
        class="flex h-8 w-8 items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
        type="button"
        @click="map?.zoomOut()"
      >
        <MinusIcon class="h-4 w-4" />
      </button>
    </div>

    <button v-if="props.showCompass" aria-label="Reset north" :class="buttonClass" type="button" @click="map?.resetNorth()">
      <NavigationIcon class="h-4 w-4" />
    </button>

    <button v-if="props.showLocate" aria-label="Locate me" :class="buttonClass" type="button" @click="locate">
      <LocateIcon class="h-4 w-4" />
    </button>

    <button v-if="props.showFullscreen" aria-label="Toggle fullscreen" :class="buttonClass" type="button" @click="toggleFullscreen">
      <Maximize2Icon class="h-4 w-4" />
    </button>
  </div>
</template>
