<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"
import { AvatarImage } from "reka-ui"

// Prop dari reka-ui tanpa JSDoc dideklarasikan ulang dengan keterangan,
// supaya hover di editor dan tabel API tidak kosong. Tipenya tetap milik Reka.
interface Props extends AvatarImageProps {
  /** URL of the image; the fallback shows until it loads, or if it fails. */
  src: AvatarImageProps["src"]
  /** `referrerpolicy` of the underlying `<img>`. */
  referrerPolicy?: AvatarImageProps["referrerPolicy"]
  /** `crossorigin` of the underlying `<img>`, for images from another origin. */
  crossOrigin?: AvatarImageProps["crossOrigin"]
}

const props = defineProps<Props>()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="props"
    class="aspect-square size-full"
  >
    <slot />
  </AvatarImage>
</template>
