<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { useIsMatchMedia } from '@/composables/use-is-match-media'
import { provideResponsiveDialogContext } from './context'

/**
 * Dialog yang berubah jadi laci di layar sempit.
 *
 * Kedua bentuk itu bukan sekadar gaya. Dialog di tengah layar sempit menutupi
 * hampir seluruh isi dan tidak punya cara alami untuk ditutup dengan jempol;
 * laci dari bawah punya keduanya — pegangan untuk ditarik dan jarak jangkau
 * yang wajar.
 *
 * Yang dipakai satu komponen saja, tidak keduanya sekaligus. Menggambar
 * keduanya lalu menyembunyikan salah satunya dengan CSS akan meninggalkan dua
 * salinan isi di DOM, dan pembaca layar membacakan yang tersembunyi juga.
 *
 * Ambangnya `--breakpoint-md` Tailwind. Sebelum hidrasi jawabannya selalu
 * "bukan seluler", jadi HTML statisnya selalu berbentuk dialog — dan karena
 * isinya baru tergambar setelah dibuka, tidak ada yang perlu dicocokkan.
 */
const props = withDefaults(defineProps<{
  /** The screen-width threshold that separates the dialog from the drawer. */
  breakpoint?: string
}>(), {
  breakpoint: '(min-width: 48rem)',
})

const model = defineModel<boolean>('open', { default: false })

const isWide = useIsMatchMedia(() => props.breakpoint)
const isMobile = computed(() => !isWide.value)

provideResponsiveDialogContext(computed(() => ({ isMobile: isMobile.value })))
</script>

<template>
  <Drawer v-if="isMobile" v-model:open="model">
    <slot />
  </Drawer>
  <Dialog v-else v-model:open="model">
    <slot />
  </Dialog>
</template>
