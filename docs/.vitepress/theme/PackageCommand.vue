<script setup lang="ts">
import { CheckIcon, CopyIcon, TerminalIcon } from '@lucide/vue'
import { computed, onMounted, ref } from 'vue'
import { useClipboard } from '@/composables/use-clipboard'
import { readChoice, packageManager, PACKAGE_MANAGERS, choosePackageManager, convertCommand } from './package-manager'
import { useFadeSlide } from './fade-slide'

/**
 * Perintah pemasangan dengan tab pnpm, npm, yarn, dan bun.
 *
 * Padanan `CodeBlockCommand` di shadcn-vue. Tidak ditulis tangan di markdown:
 * plugin `isPackageCommand` di config mengganti setiap blok `bash` yang isinya
 * cuma perintah npm dengan komponen ini. Sumbernya tetap ditulis dalam bentuk
 * npm — bentuk yang paling dikenal, dan satu-satunya yang perlu dijaga.
 */
const props = defineProps<{ command: string }>()

onMounted(readChoice)

const converted = computed(() => convertCommand(props.command, packageManager.value))

const { copy, copied } = useClipboard({ copiedDuring: 1600 })

// Tepi yang masih menyimpan bagian perintah dipudarkan — tanda bahwa barisnya bisa digeser.
const line = ref<HTMLElement>()
const fade = useFadeSlide(line, converted)
</script>

<template>
  <div class="kliping-command not-prose relative my-4 overflow-hidden rounded-lg bg-(--code) text-(--code-foreground)">
    <div class="flex items-center gap-2 border-b border-border/50 px-3 py-1 pr-12">
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

    <!-- Bisa difokus hanya bila ada isi yang tersembunyi di samping, supaya
         pengguna keyboard tetap bisa menggesernya (WCAG: wilayah gulir). -->
    <pre ref="line" class="kliping-fade-slide no-scrollbar overflow-x-auto px-4 py-3.5 font-mono text-sm leading-normal outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50" :data-fade="fade" :tabindex="fade ? 0 : undefined"><code>{{ converted }}</code></pre>

    <button
      type="button"
      class="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full opacity-70 transition-opacity hover:bg-accent hover:opacity-100 focus-visible:opacity-100"
      :aria-label="copied ? 'Copied' : 'Copy command'"
      @click="copy(converted)"
    >
      <CheckIcon v-if="copied" class="size-3.5" />
      <CopyIcon v-else class="size-3.5" />
    </button>
  </div>
</template>
