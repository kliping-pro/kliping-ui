<script lang="ts">
export const description = "Keadaan kosong dengan jalur contoh yang bergulir."
</script>

<script setup lang="ts">
import { FolderCheck, ImportIcon, PlusIcon } from '@lucide/vue'
import { Marquee } from '@/components/ui/marquee'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <div class="px-6 py-10">
    <div class="mx-auto max-w-sm pt-0">
      <Empty class="px-0 py-8 md:px-0 md:py-8">
        <EmptyHeader>
          <div class="mask-y-from-60% mask-x-from-95% mb-3 w-full max-w-xs space-y-2">
            <Marquee class="h-56 [--duration:2s]" :repeat="5" vertical>
              <div class="flex w-full items-center gap-3 rounded-lg border px-4 py-3">
                <FolderCheck class="shrink-0 fill-muted text-muted-foreground/70" />
                <div class="h-5 w-full rounded-lg bg-muted" />
                <div class="ms-auto size-6 shrink-0 rounded-full bg-muted" />
              </div>
            </Marquee>
          </div>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div class="flex flex-wrap gap-2 *:mx-auto">
            <Button>
              <PlusIcon /> Create Project
            </Button>
            <Button variant="outline">
              <ImportIcon /> Import Project
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  </div>
</template>
