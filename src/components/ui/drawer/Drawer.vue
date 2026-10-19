<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "reka-ui"
import { DrawerRoot, useForwardPropsEmits } from "reka-ui"

// Prop dari reka-ui tanpa JSDoc dideklarasikan ulang dengan keterangan,
// supaya hover di editor dan tabel API tidak kosong. Tipenya tetap milik Reka.
interface Props extends DrawerRootProps {
  /** Snap point the drawer opens at when uncontrolled (one of `snapPoints`). */
  defaultSnapPoint?: DrawerRootProps["defaultSnapPoint"]
}

const props = defineProps<Props>()

const emits = defineEmits<DrawerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot
    v-slot="slotProps"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
