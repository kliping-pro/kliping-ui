<script setup lang="ts">
import { RotateCcwIcon } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTitle } from '@/composables/use-title'

const title = useTitle()
const originalTitle = ref('')

onMounted(() => {
  originalTitle.value = title.value
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Document Title
      </h3>
      <p class="text-muted-foreground text-sm">
        A two-way binding to the browser tab's title.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="demo-title">Page title</Label>
      <Input id="demo-title" v-model="title" placeholder="Type a title…" />
    </div>

    <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-xs">Tab shows</span>
      <span class="truncate font-medium text-sm">{{ title || 'Untitled' }}</span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="title = 'Kliping'">
        Set “Kliping”
      </Button>
      <Button variant="outline" :disabled="title === originalTitle" @click="title = originalTitle">
        <RotateCcwIcon />
        Restore
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Look at your browser tab — the title changes as you type.
    </p>
  </div>
</template>
