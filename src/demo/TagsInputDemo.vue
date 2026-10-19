<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'

const modelValue = ref(['Apple', 'Banana'])
</script>

<template>
  <!-- Lebarnya dinaikkan dari 300 piksel: pada lebar itu dua tag sudah
       memenuhi baris pertama, sehingga kolom ketiknya terdorong ke baris kedua
       — lalu melompat naik begitu satu tag dihapus. Yang terlihat pembaca cuma
       isinya berpindah tempat sendiri saat mereka menekan silang. Diberi ruang
       secukupnya, tag dan kolom ketiknya duduk di satu baris dan menghapus tag
       tidak lagi memindahkan apa pun. -->
  <TagsInput v-model="modelValue" class="w-[380px]">
    <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput placeholder="Fruits..." />
  </TagsInput>
</template>
