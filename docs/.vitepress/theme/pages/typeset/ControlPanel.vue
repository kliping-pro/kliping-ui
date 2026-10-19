<script setup lang="ts">
import type { ControlOption } from './data'
import { ALargeSmallIcon, MenuIcon, MoveHorizontalIcon, PilcrowIcon, ShuffleIcon } from '@lucide/vue'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ControlRow from './ControlRow.vue'
import { FLOW, FONTS, selectedFonts, FONT_GROUPS, LEADING, MEASURE, SIZES } from './data'
import { useTypeset } from './state'

/**
 * Panel kendali di kiri: menu, tujuh baris kendali, dan tombol acak.
 *
 * Bentuknya panel mengambang yang sama dengan sidebar kategori — membulat,
 * berbingkai, berlatar `bg-sidebar`. Di layar sempit barisnya jadi petak dua
 * kolom supaya tidak memanjang sampai pratinjaunya terdorong jauh ke bawah.
 */
const emit = defineEmits<{ toggleTheme: [] }>()

const { settings, displayed, shuffle, reset, canUndo, canRedo, undo, redo } = useTypeset()

// Pintasan undo/redo ditulis dengan simbol Mac hanya di Mac. Baru diketahui di
// peramban; server merender bentuk Ctrl, dan menunya baru digambar saat dibuka.
const mac = ref(false)
onMounted(() => {
  mac.value = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
})

const fonts = computed(() => selectedFonts(displayed.value))

function fontOptions(kind?: 'mono'): { label?: string, options: ControlOption[] }[] {
  const order = kind === 'mono'
    ? [FONT_GROUPS[2]!, FONT_GROUPS[0]!, FONT_GROUPS[1]!]
    : FONT_GROUPS
  return order.map(k => ({
    label: k.label,
    options: FONTS.filter(f => f.kind === k.kind).map(f => ({ value: f.id, label: f.label, family: f.stack })),
  }))
}

// Pilihan pertama heading adalah "ikut body": namanya nama fon body, bukan
// kata "Inherit", karena itulah yang sebenarnya tampil.
const headingOptions = computed(() => [
  { options: [{ value: 'inherit', label: selectedFonts(settings).body.label, family: selectedFonts(settings).body.stack }] },
  ...fontOptions(),
])

const bodyOptions = fontOptions()
const monoOptions = fontOptions('mono')
</script>

<template>
  <aside
    aria-label="Typeset controls"
    class="flex min-h-0 w-full flex-col overflow-hidden rounded-lg border bg-sidebar text-sidebar-foreground"
  >
    <div class="shrink-0 border-b p-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            type="button"
            class="flex h-9 w-full items-center justify-between gap-2 rounded-lg px-2.5 text-sm font-medium outline-none transition-colors hover:bg-pill focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-pill"
          >
            Menu
            <MenuIcon class="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="min-w-56 rounded-lg">
          <DropdownMenuItem @select="shuffle">
            Shuffle <DropdownMenuShortcut>R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem @select="emit('toggleTheme')">
            Light/Dark <DropdownMenuShortcut>D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem :disabled="!canUndo" @select="undo">
            Undo <DropdownMenuShortcut>{{ mac ? '⌘Z' : 'Ctrl+Z' }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="!canRedo" @select="redo">
            Redo <DropdownMenuShortcut>{{ mac ? '⇧⌘Z' : 'Ctrl+Shift+Z' }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @select="reset">
            Reset <DropdownMenuShortcut>⇧R</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="scrollbar-none min-h-0 flex-1 overflow-y-auto p-2">
      <div class="grid grid-cols-2 gap-2 md:grid-cols-1">
        <!-- Di bawah ±60ch layarnya sendiri sudah membatasi lebar, jadi measure
             tidak mengubah apa pun: disembunyikan, seperti upstream. -->
        <ControlRow label="Measure" setting-key="measure" :groups="[{ options: MEASURE }]" class="max-[28rem]:hidden">
          <template #icon>
            <MoveHorizontalIcon class="size-4" />
          </template>
        </ControlRow>
        <div class="hidden border-t md:my-1 md:block" />
        <ControlRow label="Heading" setting-key="heading" :groups="headingOptions">
          <template #icon>
            <span class="text-base leading-none" :style="{ fontFamily: fonts.heading.stack }">Aa</span>
          </template>
        </ControlRow>
        <ControlRow label="Body" setting-key="body" :groups="bodyOptions">
          <template #icon>
            <span class="text-base leading-none" :style="{ fontFamily: fonts.body.stack }">Aa</span>
          </template>
        </ControlRow>
        <ControlRow label="Mono" setting-key="mono" :groups="monoOptions">
          <template #icon>
            <span class="text-base leading-none" :style="{ fontFamily: fonts.mono.stack }">Aa</span>
          </template>
        </ControlRow>
        <div class="hidden border-t md:my-1 md:block" />
        <ControlRow label="Size" setting-key="size" :groups="[{ options: SIZES }]">
          <template #icon>
            <ALargeSmallIcon class="size-4" />
          </template>
        </ControlRow>
        <ControlRow label="Leading" setting-key="leading" :groups="[{ options: LEADING }]">
          <template #icon>
            <!-- Lucide tidak punya ikon tinggi baris: dua garis batas dengan
                 panah di antaranya, di kisi dan tebal garis yang sama. -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
              <path d="M4 3h16M4 21h16M12 7v10M9 9.5 12 7l3 2.5M9 14.5 12 17l3-2.5" />
            </svg>
          </template>
        </ControlRow>
        <ControlRow label="Flow" setting-key="flow" :groups="[{ options: FLOW }]">
          <template #icon>
            <PilcrowIcon class="size-4" />
          </template>
        </ControlRow>
      </div>
    </div>

    <div class="shrink-0 border-t p-2">
      <Button variant="outline" class="w-full rounded-lg" @click="shuffle">
        <ShuffleIcon /> Shuffle
      </Button>
    </div>
  </aside>
</template>
