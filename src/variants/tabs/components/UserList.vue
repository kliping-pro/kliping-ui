<script setup lang="ts">
import { BanIcon, MoreHorizontalIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

/**
 * Daftar orang yang muncul satu per satu, bergantian.
 *
 * Sumbernya memakai `framer-motion`: sebuah `variants` untuk wadahnya dengan
 * `staggerChildren: 0.15`, dan satu lagi untuk tiap barisnya. Yang sebenarnya
 * digambar cuma dua hal — buram jadi jelas, dan naik dua puluh piksel — dengan
 * jeda yang bertambah per baris.
 *
 * Keduanya bisa ditulis sebagai animasi CSS biasa, dan jeda bertingkatnya
 * datang dari `animation-delay` yang dihitung dari nomor barisnya. Yang hilang
 * dibanding sumbernya cuma animasi keluar, yang di sini tidak pernah terlihat:
 * tab yang berganti melepas isinya seketika.
 */
defineProps<{ users: { username: string, fullName: string }[] }>()
</script>

<template>
  <div class="@container space-y-4">
    <div
      v-for="({ username, fullName }, index) in users"
      :key="username"
      class="fade-in-up flex items-center justify-between gap-2"
      :style="{ animationDelay: `${index * 150}ms` }"
    >
      <div class="flex min-w-0 items-center gap-2.5 sm:gap-4">
        <!--
          Lingkarannya cuma hiasan: di daftar yang sangat sempit ia memberi
          tempat untuk nama, yang lalu patah di spasi alih-alih terpotong.
        -->
        <div class="hidden h-8 w-8 shrink-0 rounded-full bg-secondary @[13rem]:block sm:h-10 sm:w-10" />
        <div class="min-w-0 wrap-break-word">
          <span class="block font-semibold text-sm leading-tight sm:leading-none">{{ fullName }}</span>
          <span class="text-xs leading-none">@{{ username }}</span>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button class="size-7 sm:size-9" size="icon" variant="outline">
          <MoreHorizontalIcon class="h-5 w-5" />
        </Button>
        <Button class="size-7 text-destructive sm:size-9" size="icon" variant="outline">
          <BanIcon class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.3s ease-out forwards;
}

/* Yang tidak mau melihat gerakan mendapat hasil akhirnya langsung. */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    opacity: 1;
    animation: none;
  }
}
</style>
