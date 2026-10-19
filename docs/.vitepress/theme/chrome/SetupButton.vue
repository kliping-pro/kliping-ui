<script setup lang="ts">
import { CheckIcon, CopyIcon, PackageIcon, XIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClipboard } from '@/composables/use-clipboard'
import PackageCommand from '../PackageCommand.vue'
import { convertCommand, packageManager, readChoice } from '../package-manager'
import { useSetup } from '../setup'

/**
 * Tombol "Setup" di header: jumlah item di keranjang, dan dialog "Start setup"
 * yang memberi satu perintah gabungan untuk semuanya.
 *
 * Membuka dialog langsung menyalin perintahnya (dalam pengelola paket yang
 * dipilih pembaca) — tujuan keranjang ini memang satu tempel di terminal.
 */
const setup = useSetup()
const open = ref(false)
const count = computed(() => setup.items.value.length)

onMounted(readChoice)

const { copy, copied } = useClipboard({ copiedDuring: 1600 })
const copyCommand = () => copy(convertCommand(setup.command.value, packageManager.value))

function startSetup() {
  open.value = true
  if (count.value)
    copyCommand()
}
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    class="relative gap-1.5 px-2"
    :aria-label="count ? `Setup, ${count} item${count === 1 ? '' : 's'}` : 'Setup'"
    @click="startSetup"
  >
    <PackageIcon />
    <span class="hidden sm:inline">Setup</span>
    <span
      v-if="count"
      class="bg-primary text-primary-foreground flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[0.6875rem] font-medium tabular-nums"
    >{{ count }}</span>
  </Button>

  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Start setup</DialogTitle>
        <DialogDescription>
          <template v-if="count">
            {{ count }} item{{ count === 1 ? '' : 's' }}, satu perintah. Perintahnya sudah tersalin —
            tempel di terminal project Anda.
          </template>
          <template v-else>
            Belum ada item. Tekan <strong>Add to setup</strong> di halaman komponen, block, varian,
            grafik, atau hook, lalu kembali ke sini untuk memasang semuanya sekaligus.
          </template>
        </DialogDescription>
      </DialogHeader>

      <template v-if="count">
        <ul class="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto">
          <li v-for="name in setup.items.value" :key="name">
            <span class="bg-muted inline-flex items-center gap-1 rounded-full py-0.5 pr-1 pl-2.5 font-mono text-xs">
              {{ name }}
              <button
                type="button"
                class="text-muted-foreground hover:text-foreground rounded-full p-0.5"
                :aria-label="`Remove ${name}`"
                @click="setup.remove(name)"
              >
                <XIcon class="size-3" />
              </button>
            </span>
          </li>
        </ul>

        <PackageCommand :command="setup.command.value" />

        <div class="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" @click="setup.clear()">
            Clear
          </Button>
          <Button size="sm" class="gap-1.5" @click="copyCommand">
            <CheckIcon v-if="copied" />
            <CopyIcon v-else />
            {{ copied ? 'Copied' : 'Copy command' }}
          </Button>
        </div>
      </template>

      <p class="text-muted-foreground text-xs">
        Belum ada project? Jalankan <code>npx kliping@latest init</code> dulu —
        <a :href="withBase('/installation')" class="underline underline-offset-4">lihat Installation</a>.
      </p>
    </DialogContent>
  </Dialog>
</template>
