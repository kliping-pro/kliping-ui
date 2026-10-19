<!-- example: 6. With Tags Input -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
} from '@/components/combobox-advanced'
import { TagsInput, TagsInputItem } from '@/components/tags-input-advanced'

const tricks = [
  'Kickflip',
  'Heelflip',
  'Tre Flip',
  'FS 540',
  'Casper flip 360 flip',
  'Kickflip Backflip',
  '360 Varial McTwist',
  'The 900',
]

// Satu model untuk keduanya: memilih dari daftar menambah tag, tombol hapus
// di tag mengurangi pilihan.
const value = ref<string[]>([])
</script>

<template>
  <div class="w-full max-w-md">
    <Combobox v-model="value" multiple>
      <ComboboxAnchor as-child>
        <TagsInput
          v-model="value"
          class="relative flex h-full min-h-10 flex-row flex-wrap items-center justify-start gap-1.5 px-2.5 py-2 pr-8"
        >
          <TagsInputItem v-for="item in value" :key="item" :value="item">
            {{ item }}
          </TagsInputItem>
          <ComboboxInput placeholder="Tricks..." class="h-fit min-w-20 flex-1 p-0" />
          <ComboboxTrigger class="absolute top-2.5 right-2" />
        </TagsInput>
      </ComboboxAnchor>
      <ComboboxContent :side-offset="5">
        <ComboboxEmpty>No tricks found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxGroupLabel>Tricks</ComboboxGroupLabel>
          <ComboboxItem v-for="trick in tricks" :key="trick" :value="trick" outset>
            {{ trick }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
