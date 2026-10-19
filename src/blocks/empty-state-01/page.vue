<script lang="ts">
export const description = "Kartu kosong dengan ikon dan tombol tambah."
</script>

<script setup lang="ts">
import { Folders, ImportIcon, PlusIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <div class="px-6 py-10">
    <Card class="mx-auto max-w-sm pt-0">
      <CardHeader class="rounded-t-xl border-b bg-muted py-5!">
        <CardTitle>Projects</CardTitle>
        <CardDescription>Your projects across all platforms.</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty class="px-0 py-8 md:px-0 md:py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folders />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven't created any projects yet. Get started by
              creating your first project.
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
      </CardContent>
    </Card>
  </div>
</template>
