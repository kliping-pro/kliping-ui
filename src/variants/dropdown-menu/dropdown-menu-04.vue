<script lang="ts">
export const description = "Pilihan tunggal berikon prioritas berwarna."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronsUp, ChevronUp, Equal } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const priority = ref("highest")

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Set Priority</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-44">
      <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="priority">
        <DropdownMenuRadioItem value="highest">
          <ChevronsUp class="mr-2 h-4 w-4 text-destructive" /> Highest
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="high">
          <ChevronUp class="mr-2 h-4 w-4 text-orange-500" /> High
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="medium">
          <Equal class="mr-2 h-4 w-4 text-yellow-500" /> Medium
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="low">
          <ChevronDown class="mr-2 h-4 w-4 text-green-600" /> Low
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
