<script setup lang="ts" generic="T = unknown">
import type MapLibreGL from 'maplibre-gl'
import { toRaw, watchEffect } from 'vue'
import { safely, useMap } from './context'

/**
 * Titik-titik dalam jumlah besar yang dikelompokkan saat peta diperkecil.
 *
 * Pengelompokannya dikerjakan MapLibre di worker, bukan di sini — komponen ini
 * hanya memasang source GeoJSON ber-`cluster` dan tiga layer: lingkaran
 * klaster, angka di dalamnya, dan titik yang berdiri sendiri.
 */
const props = withDefaults(defineProps<{
  /** GeoJSON point collection, or a URL to one, whose points are clustered. */
  data: GeoJSON.FeatureCollection<GeoJSON.Point, T> | string
  /** Radius in px within which points are merged into one cluster. */
  clusterRadius?: number
  /** Highest zoom level at which points are still clustered. */
  clusterMaxZoom?: number
  /** Cluster circle colors for the small, medium, and large tiers. */
  clusterColors?: [string, string, string]
  /** Point counts at which a cluster switches to the medium and the large color. */
  clusterThresholds?: [number, number]
  /** Fill color of points that are not in a cluster. */
  pointColor?: string
}>(), {
  clusterRadius: 50,
  clusterMaxZoom: 14,
  clusterColors: () => ['#51bbd6', '#f1f075', '#f28cb1'],
  clusterThresholds: () => [100, 750],
  pointColor: '#3b82f6',
})

const emit = defineEmits<{
  /** A single point was clicked: its feature and position. */
  pointClick: [feature: GeoJSON.Feature<GeoJSON.Point, T>, lngLat: MapLibreGL.LngLat]
  /** A cluster was clicked: its id and position. */
  clusterClick: [clusterId: number, lngLat: MapLibreGL.LngLat]
}>()

const { map, maplibre, isLoaded, styleVersion } = useMap()

const sourceId = 'clusters'
const clusterLayerId = 'clusters-layer'
const clusterCountLayerId = 'cluster-count'
const pointLayerId = 'unclustered-point'

watchEffect((onCleanup) => {
  const mapInstance = map.value
  const lib = maplibre.value
  void styleVersion.value
  if (!mapInstance || !lib || !isLoaded.value) return

  const [w1, w2, w3] = props.clusterColors
  const [b1, b2] = props.clusterThresholds

  mapInstance.addSource(sourceId, {
    type: 'geojson',
    // Objek mentah, bukan proxy reaktif — data ini dikirim ke worker.
    data: typeof props.data === 'string' ? props.data : (toRaw(props.data) as GeoJSON.FeatureCollection),
    cluster: true,
    clusterMaxZoom: props.clusterMaxZoom,
    clusterRadius: props.clusterRadius,
  })

  mapInstance.addLayer({
    id: clusterLayerId,
    type: 'circle',
    source: sourceId,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], w1, b1, w2, b2, w3],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      'circle-opacity': 0.8,
    },
  })

  mapInstance.addLayer({
    id: clusterCountLayerId,
    type: 'symbol',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint: { 'text-color': '#ffffff' },
  })

  mapInstance.addLayer({
    id: pointLayerId,
    type: 'circle',
    source: sourceId,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': props.pointColor,
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
    },
  })

  // Sumbernya hanya memperbesar ke klaster kalau `onClusterClick` diberikan.
  // Peristiwa Vue tidak bisa ditanya ada pendengarnya atau tidak, jadi klaster
  // selalu diperbesar — perilaku yang memang diharapkan dari klaster.
  const onClusterClick = (e: MapLibreGL.MapLayerMouseEvent) => {
    const features = mapInstance.queryRenderedFeatures(e.point, { layers: [clusterLayerId] })
    if (!features.length) return
    const clusterId = features[0].properties?.cluster_id as number
    const source = mapInstance.getSource(sourceId) as MapLibreGL.GeoJSONSource

    source.getClusterExpansionZoom(clusterId)
      .then((zoom) => {
        const [lng, lat] = (features[0].geometry as GeoJSON.Point).coordinates
        mapInstance.easeTo({ center: [lng, lat], zoom })
        emit('clusterClick', clusterId, new lib.LngLat(lng, lat))
      })
      .catch((error) => {
        console.error('Failed to compute the cluster zoom:', error)
      })
  }

  const onPointClick = (e: MapLibreGL.MapLayerMouseEvent) => {
    if (!e.features?.length) return
    const feature = e.features[0] as unknown as GeoJSON.Feature<GeoJSON.Point, T>
    const [lng, lat] = feature.geometry.coordinates
    emit('pointClick', feature, new lib.LngLat(lng, lat))
  }

  const setPointerCursor = () => {
    mapInstance.getCanvas().style.cursor = 'pointer'
  }
  const resetCursor = () => {
    mapInstance.getCanvas().style.cursor = ''
  }

  mapInstance.on('click', clusterLayerId, onClusterClick)
  mapInstance.on('click', pointLayerId, onPointClick)
  for (const layer of [clusterLayerId, pointLayerId]) {
    mapInstance.on('mouseenter', layer, setPointerCursor)
    mapInstance.on('mouseleave', layer, resetCursor)
  }

  onCleanup(() => safely(() => {
    mapInstance.off('click', clusterLayerId, onClusterClick)
    mapInstance.off('click', pointLayerId, onPointClick)
    for (const layer of [clusterLayerId, pointLayerId]) {
      mapInstance.off('mouseenter', layer, setPointerCursor)
      mapInstance.off('mouseleave', layer, resetCursor)
    }
    if (mapInstance.getLayer(pointLayerId)) mapInstance.removeLayer(pointLayerId)
    if (mapInstance.getLayer(clusterCountLayerId)) mapInstance.removeLayer(clusterCountLayerId)
    if (mapInstance.getLayer(clusterLayerId)) mapInstance.removeLayer(clusterLayerId)
    if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId)
  }))
})
</script>

<template>
  <!-- Tidak menggambar DOM apa pun: titik dan klaster digambar di kanvas. -->
</template>
