<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check, ChevronsUpDown } from '@lucide/vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { injectPhoneInputContext } from './context'

/**
 * Pemilih negaranya.
 *
 * Dibungkus `Command` supaya bisa dicari — 239 negara dalam satu daftar
 * gulung tanpa pencarian bukan pilihan yang layak.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, selectCountry } = injectPhoneInputContext('PhoneInputCountrySelect')

const open = ref(false)

function select(code: string) {
  selectCountry(code)
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        :aria-expanded="open"
        aria-label="Select country"
        :class="cn('h-9 shrink-0 gap-1 rounded-e-none border-0 border-input border-r px-2 font-normal', props.class)"
        data-slot="phone-input-country-select"
        :disabled="state.disabled || state.readonly"
        role="combobox"
        type="button"
        variant="ghost"
      >
        <span v-if="state.showFlag" class="text-base leading-none">{{ state.selected?.flag }}</span>
        <span class="text-muted-foreground text-sm">{{ state.selected?.dialCode }}</span>
        <ChevronsUpDown class="size-3.5 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent align="start" class="w-72 p-0">
      <Command>
        <CommandInput placeholder="Search country…" />
        <CommandList>
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="n in state.countries"
              :key="n.code"
              :value="`${n.name} ${n.dialCode} ${n.code}`"
              @select="select(n.code)"
            >
              <span class="mr-1 text-base leading-none">{{ n.flag }}</span>
              <span class="flex-1 truncate">{{ n.name }}</span>
              <span class="text-muted-foreground text-xs">{{ n.dialCode }}</span>
              <Check :class="cn('ml-1 size-4', state.selected?.code === n.code ? 'opacity-100' : 'opacity-0')" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
