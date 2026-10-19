<script setup lang="ts">
import { CheckIcon, CopyIcon, TerminalIcon } from '@lucide/vue'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useClipboard } from '@/composables/use-clipboard'
import { readChoice, packageManager, PACKAGE_MANAGERS, choosePackageManager, convertCommand } from './package-manager'
import { useFadeSlide } from './fade-slide'
import { klipingAdd } from '../kliping-command.mjs'

/**
 * Perintah pemasangan sebuah item registry, dengan tombol salin.
 *
 * Alamat registry-nya dibaca dari env, tidak ditulis di sini. Halaman ini
 * dibangun sekali dan disajikan ke semua orang; satu alamat yang tertulis
 * langsung berarti satu alamat yang salah begitu domainnya berganti.
 *
 * Dan iya — komponen ini memakai `useClipboard` milik registry sendiri. Itu
 * disengaja: kalau composable-nya tidak cukup baik untuk dipakai situsnya
 * sendiri, ia belum cukup baik untuk dikirim ke orang lain.
 */
const props = defineProps<{ name: string }>()

const registryUrl = import.meta.env.VITE_REGISTRY_URL ?? 'https://kliping.pro/r'

// Kliping CLI by default; the registry URL also works with the shadcn-vue CLI.
const mode = ref<'kliping' | 'shadcn-vue'>('kliping')
const MODES = [
  { id: 'kliping', label: 'kliping' },
  { id: 'shadcn-vue', label: 'shadcn-vue' },
] as const

onMounted(readChoice)

// Ditulis dalam bentuk npx, lalu diterjemahkan ke pengelola paket yang dipilih
// pembaca — pilihan yang sama dengan seluruh blok perintah lain di situs ini.
const command = computed(() => convertCommand(
  mode.value === 'kliping'
    ? klipingAdd(props.name)
    : `npx shadcn-vue@latest add ${registryUrl}/${props.name}.json`,
  packageManager.value,
))

const { copy, copied } = useClipboard({ copiedDuring: 1600 })

// Tepi yang masih menyimpan bagian perintah dipudarkan — tanda bahwa barisnya bisa digeser.
const line = ref<HTMLElement>()
const fade = useFadeSlide(line, command)
</script>

<template>
  <div class="not-prose relative my-4 overflow-hidden rounded-lg bg-(--code) text-(--code-foreground)">
    <div class="flex items-center justify-between gap-2 border-b border-border/50 px-3 py-1">
      <div class="flex items-center gap-2">
        <div class="flex size-4 shrink-0 items-center justify-center rounded-[1px] bg-foreground opacity-70">
          <TerminalIcon class="size-3 text-(--code)" />
        </div>
        <div role="tablist" class="kliping-segmented flex items-center">
          <button
            v-for="p in PACKAGE_MANAGERS"
            :key="p"
            type="button"
            role="tab"
            :aria-selected="packageManager === p"
            class="h-7 border px-2.5 pt-0.5 font-mono text-sm transition-colors"
            :class="packageManager === p ? 'border-input bg-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'"
            @click="choosePackageManager(p)"
          >
            {{ p }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <div role="tablist" class="kliping-segmented flex items-center">
          <button
            v-for="m in MODES"
            :key="m.id"
            type="button"
            role="tab"
            :aria-selected="mode === m.id"
            class="h-6 border px-2 text-xs transition-colors"
            :class="mode === m.id ? 'border-input bg-accent font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'"
            @click="mode = m.id"
          >
            {{ m.label }}
          </button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="size-7 opacity-70 hover:opacity-100"
          :aria-label="copied ? 'Copied' : 'Copy command'"
          @click="copy(command)"
        >
          <CheckIcon v-if="copied" class="size-3.5" />
          <CopyIcon v-else class="size-3.5" />
        </Button>
      </div>
    </div>

    <!-- Bisa difokus hanya bila ada isi yang tersembunyi di samping, supaya
         pengguna keyboard tetap bisa menggesernya (WCAG: wilayah gulir). -->
    <pre ref="line" class="kliping-fade-slide no-scrollbar overflow-x-auto px-4 py-3.5 font-mono text-sm leading-normal outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50" :data-fade="fade" :tabindex="fade ? 0 : undefined"><code>{{ command }}</code></pre>
  </div>

  <p v-if="mode === 'shadcn-vue'" class="text-muted-foreground text-sm">
    Registry Kliping juga bisa dipasang dengan CLI shadcn-vue lewat alamat lengkapnya.
  </p>
</template>
