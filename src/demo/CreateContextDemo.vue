<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue'
import { defineComponent, h, inject, provide, ref } from 'vue'
import { Button } from '@/components/ui/button'

const ThemeKey = Symbol('example-theme')

const isDark = ref(false)
provide(ThemeKey, isDark)

// Anak yang mengambilnya lewat inject — sedalam apa pun letaknya, tanpa
// satu pun prop dioper turun.
const Grandchild = defineComponent({
  setup() {
    const theme = inject<typeof isDark>(ThemeKey)
    return () => h('div', {
      class: [
        'flex items-center justify-between gap-3 rounded-md border px-3 py-2 transition-colors',
        theme?.value ? 'border-primary bg-primary/5' : 'bg-background',
      ],
    }, [
      h('span', { class: 'text-muted-foreground text-xs' }, 'Grandchild'),
      h('span', { class: 'font-mono font-medium text-xs' }, theme?.value ? '"dark"' : '"light"'),
    ])
  },
})

const Child = defineComponent({
  setup: () => () => h('div', { class: 'flex flex-col gap-2 rounded-md border border-dashed p-3' }, [
    h('span', { class: 'text-muted-foreground text-xs' }, 'Child · no props'),
    h(Grandchild),
  ]),
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Shared Context
      </h3>
      <p class="text-muted-foreground text-sm">
        Provide once, read anywhere below.
      </p>
    </div>

    <div class="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3">
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground text-xs">Parent</span>
        <span class="font-mono text-xs">{{ isDark ? '"dark"' : '"light"' }}</span>
      </div>
      <component :is="Child" />
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" @click="isDark = !isDark">
        <SunIcon v-if="isDark" />
        <MoonIcon v-else />
        Toggle theme in parent
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Shared via <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">provide</code> — no props.
    </p>
  </div>
</template>
