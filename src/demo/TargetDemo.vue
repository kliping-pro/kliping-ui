<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { Button } from '@/components/ui/button'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

const box = useTemplateRef<HTMLDivElement>('box')
const source = ref<string>()
const result = ref<string>()
const isFlashing = ref(false)

function resolve(name: string, target: BasicTarget) {
  const el = getTargetElement(target)
  source.value = name
  result.value = el ? `<${(el as Element).tagName?.toLowerCase() ?? 'window'}>` : 'undefined'
  isFlashing.value = true
  setTimeout(() => (isFlashing.value = false), 400)
}

const fromRef = () => resolve('ref', box)
const fromGetter = () => resolve('getter', () => box.value)
const fromElement = () => resolve('element', box.value)

onMounted(() => {
  source.value = 'ref'
  result.value = getTargetElement(box) ? '<div>' : 'undefined'
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Resolve Target
      </h3>
      <p class="text-muted-foreground text-sm">
        A ref, a getter or an element — one DOM node.
      </p>
    </div>

    <div
      ref="box"
      class="flex h-20 items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm transition-colors"
      :class="isFlashing ? 'border-primary bg-primary/5 text-foreground' : 'bg-muted/40'"
    >
      Target element
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Input</span>
        <span class="font-mono text-sm">{{ source ?? '—' }}</span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Resolved</span>
        <span class="font-mono text-sm">{{ result ?? '—' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button @click="fromRef">
        From ref
      </Button>
      <Button variant="secondary" @click="fromGetter">
        From getter
      </Button>
      <Button variant="outline" class="col-span-2" @click="fromElement">
        From element
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Three input shapes, one result: <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">getTargetElement</code>
    </p>
  </div>
</template>
