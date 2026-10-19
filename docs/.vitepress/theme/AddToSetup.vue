<script setup lang="ts">
import { CheckIcon, PlusIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useSetup } from './setup'

/**
 * Tombol "Add to setup" / "In setup" untuk satu item registry.
 *
 * Tidak tampil untuk nama yang bukan item registry (template, halaman
 * dokumentasi biasa), dan baru tampil setelah indeks registry dimuat — jadi
 * render server tidak pernah menjanjikan tombol yang ternyata tidak berlaku.
 */
const props = withDefaults(defineProps<{ name: string, size?: 'sm' | 'icon-sm' }>(), { size: 'sm' })

const setup = useSetup()
</script>

<template>
  <Button
    v-if="setup.isItem(props.name)"
    :variant="setup.has(props.name) ? 'secondary' : 'outline'"
    :size="props.size"
    class="shrink-0 gap-1 shadow-none"
    :aria-pressed="setup.has(props.name)"
    :title="setup.has(props.name) ? `Remove ${props.name} from setup` : `Add ${props.name} to setup`"
    @click="setup.toggle(props.name)"
  >
    <CheckIcon v-if="setup.has(props.name)" />
    <PlusIcon v-else />
    <span v-if="props.size === 'sm'">{{ setup.has(props.name) ? 'In setup' : 'Add to setup' }}</span>
  </Button>
</template>
