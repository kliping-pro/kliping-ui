<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import { safely, injectMapMarkerContext, useMap } from './context'

/**
 * Keterangan singkat yang muncul selama kursor berada di atas penanda.
 *
 * Dibangun dari `Popup` MapLibre juga — dengan begitu ia ikut bergeser dan
 * berganti sisi bersama peta tanpa perlu menghitung posisinya sendiri.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { map, maplibre } = useMap()
const { marker, markerElement } = injectMapMarkerContext('MarkerTooltip')

const container = shallowRef<HTMLDivElement | null>(null)
onMounted(() => {
  container.value = document.createElement('div')
})

watch([container, marker, markerElement], ([content, m, el], _, onCleanup) => {
  const lib = maplibre.value
  const mapInstance = map.value
  if (!lib || !mapInstance || !content || !m || !el) return

  const tooltip = new lib.Popup({ closeButton: false, closeOnClick: false, offset: 15 })
    .setMaxWidth('none')
    .setDOMContent(content)

  const onMouseEnter = () => tooltip.setLngLat(m.getLngLat()).addTo(mapInstance)
  const onMouseLeave = () => tooltip.remove()
  el.addEventListener('mouseenter', onMouseEnter)
  el.addEventListener('mouseleave', onMouseLeave)

  onCleanup(() => {
    el.removeEventListener('mouseenter', onMouseEnter)
    el.removeEventListener('mouseleave', onMouseLeave)
    safely(() => tooltip.remove())
  })
}, { immediate: true })

onUnmounted(() => {
  container.value = null
})
</script>

<template>
  <Teleport v-if="container" :to="container">
    <div
      :class="cn(
        'fade-in-0 zoom-in-95 animate-in rounded-md bg-foreground px-2 py-1 text-background text-xs shadow-md',
        props.class,
      )"
    >
      <slot />
    </div>
  </Teleport>
</template>
