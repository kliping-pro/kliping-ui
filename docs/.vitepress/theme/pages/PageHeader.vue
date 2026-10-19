<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { Badge } from '@/components/ui/badge'

/**
 * Kepala halaman lepas — judul besar, keterangan, dan sepasang tombol.
 *
 * Bentuknya sama dengan yang dipakai beranda, dan memang begitu di upstream:
 * satu kepala halaman untuk semua tujuan nav di luar dokumentasi.
 */
defineProps<{
  title: string
  description: string
  announcement?: string
  announcementHref?: string
}>()
</script>

<template>
  <section>
    <div class="container-wrapper">
      <div class="container flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <Badge v-if="announcement" as-child variant="secondary" class="bg-muted">
          <a :href="withBase(announcementHref ?? '/changelog')">
            <span class="flex size-2 rounded-full bg-green-500" title="New" />
            {{ announcement }} <ArrowRightIcon />
          </a>
        </Badge>

        <h1 class="text-foreground leading-tighter max-w-3xl text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter">
          {{ title }}
        </h1>

        <p class="text-foreground max-w-4xl text-base text-balance sm:text-lg">
          {{ description }}
        </p>

        <div class="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </section>
</template>
