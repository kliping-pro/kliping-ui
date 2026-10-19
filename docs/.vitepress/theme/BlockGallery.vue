<script setup lang="ts">
import { withBase } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ names: string[] }>()

/**
 * Tiap block dibingkai iframe ke halaman block-nya sendiri, bukan dirender
 * langsung di sini.
 *
 * Block adalah tata letak selebar halaman — sidebar, grid dasbor, form yang
 * memusat. Dirender di dalam kolom dokumentasi yang sempit, semuanya patah dan
 * yang terlihat bukan lagi block-nya. Iframe memberi tiap block lebar desktop
 * yang diasumsikannya, lalu hasilnya diperkecil ke ukuran kartu.
 */
const WIDTH = 1440
const HEIGHT = 900

const container = ref<HTMLElement>()
const scale = ref(0.25)
let observer: ResizeObserver | undefined

function measure() {
  const width = container.value?.querySelector('.kliping-block-frame')?.clientWidth
  if (width)
    scale.value = width / WIDTH
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (container.value)
    observer.observe(container.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="container" class="kliping-block-gallery">
    <a v-for="name in props.names" :key="name" :href="withBase(`/blocks/${name}`)" class="kliping-block-card">
      <div class="kliping-block-frame">
        <iframe
          :src="withBase(`/view/${name}`)"
          :title="name"
          loading="lazy"
          :width="WIDTH"
          :height="HEIGHT"
          :style="{ transform: `scale(${scale})` }"
        />
      </div>
      <span class="kliping-block-name">{{ name }}</span>
    </a>
  </div>
</template>
