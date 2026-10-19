<script setup lang="ts">
import type MapLibreGL from 'maplibre-gl'
import { toRaw, watchEffect } from 'vue'
import { safely, useMap } from './context'

/**
 * Garis yang menyambung beberapa koordinat — rute, jalur, batas.
 *
 * Source dan layer-nya dipasang ulang setiap kali gaya peta berganti
 * (`styleVersion`), karena `setStyle` saat tema berubah membuang semua layer
 * tambahan. Sumbernya tidak menangani ini, jadi rutenya hilang begitu temanya
 * diganti.
 */
const props = withDefaults(defineProps<{
  id: string
  /** Line vertices as [longitude, latitude] pairs. */
  coordinates: [number, number][]
  /** Line color. */
  color?: string
  /** Line width in px. */
  width?: number
  /** Line opacity, from 0 to 1. */
  opacity?: number
  /** Dash pattern as alternating dash and gap lengths in line widths; solid when omitted. */
  dashArray?: number[]
  /** Emits click and hover events and shows a pointer cursor over the line. */
  interactive?: boolean
}>(), {
  color: '#3b82f6',
  width: 3,
  opacity: 1,
  interactive: true,
})

const emit = defineEmits<{
  /** The route line was clicked. */
  click: [event: MapLibreGL.MapLayerMouseEvent]
  /** The pointer entered the route line. */
  mouseenter: [event: MapLibreGL.MapLayerMouseEvent]
  /** The pointer left the route line. */
  mouseleave: [event: MapLibreGL.MapLayerMouseEvent]
}>()

const { map, isLoaded, styleVersion } = useMap()

watchEffect((onCleanup) => {
  const mapInstance = map.value
  // Dibaca supaya efek ini berjalan lagi setelah gaya baru selesai dimuat.
  void styleVersion.value
  if (!mapInstance || !isLoaded.value) return

  const sourceId = `route-${props.id}`
  const layerId = `route-layer-${props.id}`
  // Disalin jadi larik polos: data dikirim ke worker lewat postMessage, dan
  // proxy reaktif Vue tidak bisa diklon ke sana.
  const coordinates = props.coordinates.map(([lng, lat]) => [lng, lat])
  const dashArray = props.dashArray && [...toRaw(props.dashArray)]

  if (!mapInstance.getSource(sourceId)) {
    mapInstance.addSource(sourceId, {
      type: 'geojson',
      data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } },
    })
  }

  if (!mapInstance.getLayer(layerId)) {
    mapInstance.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': props.color,
        'line-width': props.width,
        'line-opacity': props.opacity,
        ...(dashArray && { 'line-dasharray': dashArray }),
      },
    })
  }

  const onClick = (e: MapLibreGL.MapLayerMouseEvent) => emit('click', e)
  const onMouseEnter = (e: MapLibreGL.MapLayerMouseEvent) => {
    mapInstance.getCanvas().style.cursor = 'pointer'
    emit('mouseenter', e)
  }
  const onMouseLeave = (e: MapLibreGL.MapLayerMouseEvent) => {
    mapInstance.getCanvas().style.cursor = ''
    emit('mouseleave', e)
  }

  if (props.interactive) {
    mapInstance.on('click', layerId, onClick)
    mapInstance.on('mouseenter', layerId, onMouseEnter)
    mapInstance.on('mouseleave', layerId, onMouseLeave)
  }

  onCleanup(() => safely(() => {
    mapInstance.off('click', layerId, onClick)
    mapInstance.off('mouseenter', layerId, onMouseEnter)
    mapInstance.off('mouseleave', layerId, onMouseLeave)
    if (mapInstance.getLayer(layerId)) mapInstance.removeLayer(layerId)
    if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId)
  }))
})
</script>

<template>
  <!-- Tidak menggambar DOM apa pun: garisnya digambar MapLibre di kanvas. -->
</template>
