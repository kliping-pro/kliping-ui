<script setup lang="ts">
import { ArrowLeftRightIcon } from '@lucide/vue'
import { ref, useTemplateRef, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { getTargetElement } from '@/lib/target'

const useFirstBox = ref(true)
const boxOne = useTemplateRef<HTMLDivElement>('boxOne')
const boxTwo = useTemplateRef<HTMLDivElement>('boxTwo')
const resolvedName = ref('—')
const attachCount = ref(0)

// Target boleh berganti; `getTargetElement` menyelesaikan ref, getter, maupun
// instance komponen, dan watch memasang ulang saat elemennya berganti.
watch(
  () => getTargetElement(useFirstBox.value ? boxOne : boxTwo),
  (el) => {
    resolvedName.value = (el as HTMLElement | undefined)?.dataset.name ?? '—'
    if (el)
      attachCount.value += 1
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Switching Target
      </h3>
      <p class="text-muted-foreground text-sm">
        The effect follows whichever element the target points to.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div
        ref="boxOne"
        data-name="box-one"
        class="flex h-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-sm transition-colors"
        :class="useFirstBox ? 'border-primary bg-primary/5 text-foreground' : 'text-muted-foreground'"
      >
        <span class="font-medium">Box one</span>
        <span class="text-xs" :class="useFirstBox ? 'text-primary' : 'text-muted-foreground'">{{ useFirstBox ? 'Watched' : 'Idle' }}</span>
      </div>
      <div
        ref="boxTwo"
        data-name="box-two"
        class="flex h-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-sm transition-colors"
        :class="!useFirstBox ? 'border-primary bg-primary/5 text-foreground' : 'text-muted-foreground'"
      >
        <span class="font-medium">Box two</span>
        <span class="text-xs" :class="!useFirstBox ? 'text-primary' : 'text-muted-foreground'">{{ !useFirstBox ? 'Watched' : 'Idle' }}</span>
      </div>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Resolved element</span>
        <span class="font-mono text-sm">{{ resolvedName }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Effect attached</span>
        <span class="font-mono text-sm tabular-nums">{{ attachCount }}×</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="useFirstBox = !useFirstBox">
        <ArrowLeftRightIcon />
        Switch target
      </Button>
    </div>
  </div>
</template>
