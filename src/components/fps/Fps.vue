<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FpsVariants } from '.'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { fpsVariants } from '.'

/**
 * Penghitung bingkai per detik yang berjalan langsung.
 *
 * Caranya sederhana dan sengaja begitu: hitung berapa kali
 * `requestAnimationFrame` terpanggil dalam satu selang waktu, lalu bagi. Yang
 * terbaca bukan biaya render satu komponen, melainkan apakah halaman ini
 * secara keseluruhan masih sanggup menggambar 60 kali sedetik.
 *
 * Selang bawaannya setengah detik. Lebih pendek dari itu angkanya berkedip
 * terus dan tidak terbaca; lebih panjang, lonjakan sesaat tertelan rata-rata.
 */
const props = withDefaults(defineProps<{
  /** `fixed` (default) teleports to the viewport corner; `absolute` stays in its own positioned container. */
  strategy?: FpsVariants['strategy']
  /** Corner to pin to: `top-left`, `top-right` (default), `bottom-left`, or `bottom-right`. */
  position?: FpsVariants['position']
  /** Text shown before the number, followed by a colon; hidden when empty. */
  label?: string
  /** How often the number updates, in milliseconds. */
  updateInterval?: number
  /** Below this value the color changes to a warning. */
  warningThreshold?: number
  /** Below this value the color changes to an error. */
  errorThreshold?: number
  /** The target container when `strategy` is `fixed`. Defaults to `body`. */
  portalContainer?: string | HTMLElement
  /** Renders the counter and starts measuring on mount when true (default true). */
  enabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  strategy: 'fixed',
  position: 'top-right',
  updateInterval: 500,
  warningThreshold: 30,
  errorThreshold: 20,
  enabled: true,
})

const fps = ref(0)
const mounted = ref(false)

let frameId: number | null = null

function measure() {
  let frames = 0
  let since = performance.now()

  const loop = () => {
    const now = performance.now()
    frames += 1

    const elapsed = now - since
    if (elapsed >= props.updateInterval) {
      fps.value = Math.round((frames * 1000) / elapsed)
      frames = 0
      since = now
    }

    frameId = requestAnimationFrame(loop)
  }

  frameId = requestAnimationFrame(loop)
}

onMounted(() => {
  mounted.value = true
  if (props.enabled) measure()
})

onBeforeUnmount(() => {
  if (frameId !== null) cancelAnimationFrame(frameId)
})

const status = computed<FpsVariants['status']>(() => {
  if (fps.value < props.errorThreshold) return 'error'
  if (fps.value < props.warningThreshold) return 'warning'
  return 'good'
})

// Yang `absolute` menempel pada wadahnya sendiri, jadi ia tidak boleh
// dipindahkan ke mana-mana. Yang `fixed` justru harus, supaya `position:
// fixed`-nya tidak dikurung `transform` atau `filter` milik leluhurnya.
const teleported = computed(() => mounted.value && props.strategy !== 'absolute')
</script>

<template>
  <!--
    `disabled` menggambar isinya di tempatnya semula, tanpa dipindahkan. Itu
    yang dipakai selama render server dan untuk `strategy="absolute"`, dan
    yang membuat penghitung ini cuma perlu ditulis sekali — bukan dua kali,
    satu di dalam Teleport dan satu di luarnya.
  -->
  <Teleport v-if="props.enabled" :disabled="!teleported" :to="props.portalContainer ?? 'body'">
    <div
      aria-hidden="true"
      :class="cn(fpsVariants({ strategy: props.strategy, position: props.position, status }), props.class)"
      data-slot="fps"
    >
      <span v-if="props.label" class="text-muted-foreground" data-slot="fps-label">{{ props.label }}:</span>
      <span data-slot="fps-value">{{ fps }}</span>
    </div>
  </Teleport>
</template>
