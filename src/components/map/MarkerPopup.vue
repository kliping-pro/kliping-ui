<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onMounted, onUnmounted, shallowRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import { safely, injectMapMarkerContext, useMap } from './context'

/**
 * Popup yang membuka dan menutup saat penandanya diklik.
 *
 * Sumbernya membaca `isOpen` dari closure yang tidak pernah diperbarui, jadi
 * klik kedua selalu membuka lagi alih-alih menutup. Di sini popupnya sendiri
 * yang ditanya lewat `isOpen()`.
 */
const props = withDefaults(defineProps<{
  /** Shows a close button in the popup's corner. */
  closeButton?: boolean
  /** Closes the popup when the map is clicked. */
  closeOnClick?: boolean
  class?: HTMLAttributes['class']
}>(), {
  closeButton: false,
  closeOnClick: true,
})

const { map, maplibre } = useMap()
const { marker, markerElement } = injectMapMarkerContext('MarkerPopup')

// Wadah isi dibuat sekali; popupnya boleh dibangun ulang, isinya tetap di sini.
const container = shallowRef<HTMLDivElement | null>(null)
onMounted(() => {
  container.value = document.createElement('div')
})

watch(
  [container, marker, markerElement, () => props.closeButton, () => props.closeOnClick],
  ([content, m, el, closeButton, closeOnClick], _, onCleanup) => {
    const lib = maplibre.value
    const mapInstance = map.value
    if (!lib || !mapInstance || !content || !m || !el) return

    const popup = new lib.Popup({ closeButton, closeOnClick, offset: 25 })
      .setMaxWidth('none')
      .setDOMContent(content)

    const onClick = (e: MouseEvent) => {
      // Tanpa ini klik yang sama sampai ke peta dan `closeOnClick` langsung menutupnya.
      e.stopPropagation()
      if (popup.isOpen())
        popup.remove()
      else
        popup.setLngLat(m.getLngLat()).addTo(mapInstance)
    }
    el.addEventListener('click', onClick)

    onCleanup(() => {
      el.removeEventListener('click', onClick)
      safely(() => popup.remove())
    })
  },
  { immediate: true },
)

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
