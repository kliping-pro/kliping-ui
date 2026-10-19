<script setup lang="ts">
import type MapLibreGL from 'maplibre-gl'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { provideMapMarkerContext, useMap } from './context'

/**
 * Satu penanda di peta.
 *
 * Elemen DOM-nya dibuat sendiri lalu diserahkan ke MapLibre, yang memindahkannya
 * mengikuti peta. Bagian-bagian di dalamnya (`MarkerContent`, `MarkerLabel`)
 * di-teleport ke elemen itu — padanan `createPortal` di sumbernya.
 *
 * Sumbernya membongkar dan membangun ulang penandanya tiap kali koordinatnya
 * berubah. Di sini penandanya dibuat sekali; koordinat dan `draggable` cukup
 * diperbarui di tempat.
 */
const props = withDefaults(defineProps<{
  /** Marker longitude in degrees. */
  longitude: number
  /** Marker latitude in degrees. */
  latitude: number
  /** Lets the user drag the marker; emits dragstart, drag, and dragend. */
  draggable?: boolean
}>(), {
  draggable: false,
})

const emit = defineEmits<{
  /** The marker was clicked. */
  click: [event: MouseEvent]
  /** The pointer entered the marker. */
  mouseenter: [event: MouseEvent]
  /** The pointer left the marker. */
  mouseleave: [event: MouseEvent]
  /** Dragging started, at this position. */
  dragstart: [lngLat: MapLibreGL.LngLat]
  /** The marker moved while dragging, to this position. */
  drag: [lngLat: MapLibreGL.LngLat]
  /** Dragging ended, at this position. */
  dragend: [lngLat: MapLibreGL.LngLat]
}>()

const { map, maplibre } = useMap()
const marker = shallowRef<MapLibreGL.Marker | null>(null)
const markerElement = shallowRef<HTMLDivElement | null>(null)

provideMapMarkerContext({ marker, markerElement })

const onClick = (e: MouseEvent) => emit('click', e)
const onMouseEnter = (e: MouseEvent) => emit('mouseenter', e)
const onMouseLeave = (e: MouseEvent) => emit('mouseleave', e)

onMounted(() => {
  const lib = maplibre.value
  if (!lib || !map.value) return

  const el = document.createElement('div')
  el.style.cursor = 'pointer'
  el.addEventListener('click', onClick)
  el.addEventListener('mouseenter', onMouseEnter)
  el.addEventListener('mouseleave', onMouseLeave)

  const m = new lib.Marker({ element: el, draggable: props.draggable })
    .setLngLat([props.longitude, props.latitude])
    .addTo(map.value)
  m.on('dragstart', () => emit('dragstart', m.getLngLat()))
  m.on('drag', () => emit('drag', m.getLngLat()))
  m.on('dragend', () => emit('dragend', m.getLngLat()))

  markerElement.value = el
  marker.value = m
})

watch(() => [props.longitude, props.latitude] as [number, number], (lngLat) => {
  marker.value?.setLngLat(lngLat)
})

watch(() => props.draggable, (value) => {
  marker.value?.setDraggable(value)
})

onUnmounted(() => {
  const el = markerElement.value
  el?.removeEventListener('click', onClick)
  el?.removeEventListener('mouseenter', onMouseEnter)
  el?.removeEventListener('mouseleave', onMouseLeave)
  marker.value?.remove()
  marker.value = null
  markerElement.value = null
})
</script>

<template>
  <!-- Anak-anaknya menunggu elemen penandanya ada: mereka teleport ke sana. -->
  <slot v-if="markerElement" />
</template>
