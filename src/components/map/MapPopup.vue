<script setup lang="ts">
import type MapLibreGL from 'maplibre-gl'
import type { HTMLAttributes } from 'vue'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import { safely, useMap } from './context'

/**
 * Popup yang berdiri sendiri di satu koordinat, tanpa penanda.
 *
 * Ia langsung terbuka begitu dipasang. Pemakainya yang memutuskan kapan ia
 * hilang — biasanya dengan `v-if` yang dimatikan dari peristiwa `close`.
 */
const props = withDefaults(defineProps<{
  /** Popup longitude in degrees. */
  longitude: number
  /** Popup latitude in degrees. */
  latitude: number
  /** Shows a close button in the popup's corner. */
  closeButton?: boolean
  class?: HTMLAttributes['class']
}>(), {
  closeButton: true,
})

const emit = defineEmits<{
  /** The popup was closed. */
  close: []
}>()

const { map, maplibre } = useMap()
const container = shallowRef<HTMLDivElement | null>(null)
const popup = shallowRef<MapLibreGL.Popup | null>(null)

onMounted(() => {
  container.value = document.createElement('div')
})

const onClose = () => emit('close')

watch([container, () => props.closeButton], ([content, closeButton], _, onCleanup) => {
  const lib = maplibre.value
  const mapInstance = map.value
  if (!lib || !mapInstance || !content) return

  const p = new lib.Popup({ closeButton, closeOnClick: true })
    .setMaxWidth('none')
    .setLngLat([props.longitude, props.latitude])
    .setDOMContent(content)
    .addTo(mapInstance)
  p.on('close', onClose)
  popup.value = p

  onCleanup(() => {
    // Lepas pendengarnya dulu: `remove()` juga memicu `close`, padahal yang
    // menutup di sini komponennya sendiri, bukan penggunanya.
    p.off('close', onClose)
    safely(() => p.remove())
    popup.value = null
  })
}, { immediate: true })

// Sumbernya membangun ulang popupnya saat koordinat berubah; cukup digeser.
watch(() => [props.longitude, props.latitude] as [number, number], (lngLat) => {
  popup.value?.setLngLat(lngLat)
})

onUnmounted(() => {
  container.value = null
})
</script>

<template>
  <Teleport v-if="container" :to="container">
    <div
      :class="cn(
        'fade-in-0 zoom-in-95 animate-in rounded-lg border border-border bg-popover p-3 text-popover-foreground text-sm shadow-lg',
        props.class,
      )"
    >
      <slot />
    </div>
  </Teleport>
</template>
