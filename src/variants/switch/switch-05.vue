<script lang="ts">
export const description = "Tiga ukuran, dari kecil sampai besar."
</script>

<script setup lang="ts">
import Switch from '@/variants/switch/components/Switch.vue'
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch defaultChecked />
    <Switch class="h-6 w-10" defaultChecked thumb-class="h-5 w-5" />
    <Switch
      class="h-7 w-12"
      defaultChecked
      thumb-class="h-6 w-6 data-[state=checked]:translate-x-5"
    />
    <Switch
      class="h-8 w-14"
      defaultChecked
      thumb-class="h-7 w-7 data-[state=checked]:translate-x-6"
    />
  </div>
</template>
