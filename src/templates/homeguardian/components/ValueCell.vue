<script setup lang="ts">
import { CheckIcon, XIcon } from '@lucide/vue'
import { TableCell } from '@/components/ui/table'

const { value } = defineProps<{ value: boolean | string }>()
</script>

<template>
  <TableCell class="text-center">
    <CheckIcon v-if="value" class="text-green-600 mx-auto" />
    <XIcon v-else class="text-red-600 mx-auto" />
  </TableCell>
</template>
