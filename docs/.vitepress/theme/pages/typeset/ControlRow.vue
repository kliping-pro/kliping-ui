<script setup lang="ts">
import type { ControlKey, ControlOption } from './data'
import { SquareLock01Icon, SquareUnlock01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { loadFontPreviews } from './data'
import { useTypeset } from './state'

/**
 * Satu baris kendali di panel kiri: label kecil, nilai yang sedang dipilih,
 * ikon di kanan — dan menu pilihannya saat diklik.
 *
 * Penunjuk yang berhenti di atas satu pilihan langsung memperlihatkannya di
 * pratinjau tanpa memilihnya; menutup menu mengembalikan pratinjau ke pilihan
 * yang sebenarnya. Sentuhan tidak mendapat pratinjau ini — tidak ada hover di
 * layar sentuh, dan ketukan pertama sudah berarti memilih.
 *
 * Gembok di sebelah ikonnya mengunci baris ini supaya dilewati Shuffle. Sama
 * dengan upstream, gemboknya baru tampak saat barisnya disorot atau difokus —
 * kecuali sedang terkunci — dan tidak ada di layar sempit maupun layar sentuh.
 *
 * Opsi yang membawa `family` (menu fon) digambar dengan hurufnya sendiri.
 * Cuplikan fonnya baru dimuat saat menunya pertama kali dibuka.
 */
const props = defineProps<{
  label: string
  settingKey: ControlKey
  groups: { label?: string, options: (ControlOption & { family?: string })[] }[]
}>()

const { settings, update, peek, isLocked, toggleLock } = useTypeset()

const locked = computed(() => isLocked(props.settingKey))
const hasFonts = computed(() => props.groups.some(k => k.options.some(o => o.family)))

function onOpenChange(open: boolean) {
  if (!open)
    peek(null)
  else if (hasFonts.value)
    loadFontPreviews()
}

const wide = useMediaQuery('(min-width: 768px)')

const currentValue = computed(() => settings[props.settingKey])
const valueLabel = computed(() => {
  for (const k of props.groups) {
    const o = k.options.find(o => o.value === currentValue.value)
    if (o)
      return o.label
  }
  return currentValue.value
})

function select(v: unknown) {
  if (typeof v === 'string')
    update({ [props.settingKey]: v })
}

function preview(e: PointerEvent | FocusEvent, v: string) {
  if ('pointerType' in e && e.pointerType !== 'mouse')
    return
  peek({ [props.settingKey]: v })
}
</script>

<template>
  <div class="group/row relative min-w-0" :data-locked="locked">
    <DropdownMenu @update:open="onOpenChange">
      <DropdownMenuTrigger as-child>
        <button
          type="button"
          class="relative flex w-full min-w-0 items-center gap-2 rounded-lg border bg-background/40 py-2 pr-9 pl-3 text-left outline-none transition-colors hover:bg-pill group-hover/row:bg-pill focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-pill md:group-hover/row:pr-14 md:group-focus-within/row:pr-14 md:group-data-[locked=true]/row:pr-14 pointer-coarse:pr-9!"
        >
          <span class="flex min-w-0 flex-col">
            <span class="text-muted-foreground text-xs">{{ label }}</span>
            <span class="truncate text-sm font-medium">{{ valueLabel }}</span>
          </span>
          <span class="pointer-events-none absolute top-1/2 right-3 flex size-4 -translate-y-1/2 items-center justify-center" aria-hidden="true">
            <slot name="icon" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        :side="wide ? 'right' : 'bottom'"
        :align="wide ? 'start' : 'center'"
        :side-offset="8"
        class="max-h-96 min-w-44 rounded-lg"
        @pointerleave="peek(null)"
      >
        <DropdownMenuRadioGroup :model-value="currentValue" @update:model-value="select">
          <template v-for="(k, i) in groups" :key="k.label ?? i">
            <DropdownMenuSeparator v-if="i > 0" />
            <DropdownMenuGroup>
              <DropdownMenuLabel v-if="k.label" class="text-muted-foreground text-xs font-normal">
                {{ k.label }}
              </DropdownMenuLabel>
              <DropdownMenuRadioItem
                v-for="o in k.options"
                :key="o.value"
                :value="o.value"
                @pointermove="preview($event, o.value)"
                @focus="preview($event, o.value)"
              >
                <span :style="o.family ? { fontFamily: o.family } : undefined">{{ o.label }}</span>
              </DropdownMenuRadioItem>
            </DropdownMenuGroup>
          </template>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <button
      type="button"
      :title="locked ? 'Unlock' : 'Lock'"
      :aria-label="locked ? `Unlock ${label}` : `Lock ${label}`"
      :aria-pressed="locked"
      :data-locked="locked"
      class="absolute top-1/2 right-8 flex size-5 -translate-y-1/2 items-center justify-center rounded-md opacity-0 outline-none transition-opacity group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring data-[locked=true]:opacity-100 max-md:hidden pointer-coarse:hidden"
      @click="toggleLock(settingKey)"
    >
      <HugeiconsIcon :icon="locked ? SquareLock01Icon : SquareUnlock01Icon" :stroke-width="2" class="size-4" />
    </button>
  </div>
</template>
