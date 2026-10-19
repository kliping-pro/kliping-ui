<script setup lang="ts">
import { CheckIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon, FileTextIcon } from '@lucide/vue'
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * Menyerahkan halaman ini ke model bahasa.
 *
 * Yang disalin sumber markdown-nya, bukan teks yang tampil: itu yang memuat
 * frontmatter, blok kode dengan pagar dan bahasanya, serta struktur heading —
 * bentuk yang paling mudah dicerna model.
 *
 * Berkasnya disalin ke `/raw/` saat build, jadi permintaannya ke aset statis di
 * origin yang sama. Tidak ada server yang menjalankannya, dan tidak ada layanan
 * luar yang dihubungi sampai pembaca sendiri memilih membukanya di sana.
 */
const { page } = useData()

/**
 * Jalur berkasnya diambil dari `page.filePath`, bukan disusun ulang dari URL.
 *
 * Menyusunnya dari URL sempat membuat halaman indeks salah alamat: `/directory`
 * dan `/directory/` menunjuk ke halaman yang sama, tapi menghasilkan tebakan
 * yang berbeda — dan yang ditautkan menu navigasi justru yang tanpa garis
 * miring, alias yang meleset. `filePath` menyebut berkas sumbernya apa adanya,
 * dan hook penyalin di config memakai jalur relatif yang sama persis.
 */
const rawPath = computed(() => withBase(`/raw/${page.value.filePath}`))

const pageUrl = computed(() => (typeof window === 'undefined' ? '' : window.location.href))

function promptUrl(baseUrl: string) {
  return `${baseUrl}?q=${encodeURIComponent(
    `Saya sedang membaca dokumentasi Kliping ini: ${pageUrl.value}\n`
    + 'Bantu saya memahami cara memakainya — boleh menjelaskan konsepnya, memberi contoh, '
    + 'atau membantu menelusuri masalah berdasarkan halaman itu. Jawab dalam Bahasa Indonesia.',
  )}`
}

const copied = ref(false)
const failed = ref(false)

async function copyMarkdown() {
  failed.value = false
  try {
    const markdown = await fetch(rawPath.value).then(r => r.text())
    await navigator.clipboard.writeText(markdown)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
  catch {
    // Klip bisa ditolak peramban, dan berkasnya bisa saja belum ada saat
    // dokumentasi dijalankan dari dev server. Keduanya bukan alasan untuk
    // membiarkan tombolnya diam tanpa kabar.
    failed.value = true
    setTimeout(() => (failed.value = false), 3000)
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="sm" class="h-8 gap-1 px-2.5 shadow-none md:h-7">
        <CheckIcon v-if="copied" class="size-3.5" />
        <CopyIcon v-else class="size-3.5" />
        <span class="text-xs">{{ failed ? 'Copy failed' : copied ? 'Copied' : 'Copy Page' }}</span>
        <ChevronDownIcon class="size-3.5" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuItem @select="copyMarkdown">
        <CopyIcon /> Copy as Markdown
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <a :href="rawPath" target="_blank" rel="noreferrer">
          <FileTextIcon /> View as Markdown
        </a>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem as-child>
        <a :href="promptUrl('https://claude.ai/new')" target="_blank" rel="noreferrer">
          <ExternalLinkIcon /> Open in Claude
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <a :href="promptUrl('https://chatgpt.com')" target="_blank" rel="noreferrer">
          <ExternalLinkIcon /> Open in ChatGPT
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
