<script setup lang="ts">
import { computed } from 'vue'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useOs } from '@/composables/use-os'

const os = useOs()

const OS_NAMES: Record<string, string> = {
  macos: 'macOS',
  ios: 'iOS',
  windows: 'Windows',
  android: 'Android',
  linux: 'Linux',
  chromeos: 'ChromeOS',
  undetermined: 'Undetermined',
}

const apple = computed(() => os.value === 'macos' || os.value === 'ios')
const modifier = computed(() => (apple.value ? '⌘' : 'Ctrl'))
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Operating System
      </h3>
      <p class="text-muted-foreground text-sm">
        Detects the platform so shortcuts can match it.
      </p>
    </div>

    <div class="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-4 py-6">
      <span class="font-semibold text-3xl tracking-tight">{{ OS_NAMES[os] ?? os }}</span>
      <code class="font-mono text-muted-foreground text-xs">'{{ os }}'</code>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Save</span>
        <KbdGroup>
          <Kbd>{{ modifier }}</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Search</span>
        <KbdGroup>
          <Kbd>{{ modifier }}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Read on mount; the server renders <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">undetermined</code>.
    </p>
  </div>
</template>
