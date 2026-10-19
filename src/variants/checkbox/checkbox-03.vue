<script lang="ts">
export const description = "Induk dan anak: induknya setengah tercentang saat anaknya berselisih."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Checkbox from '@/variants/checkbox/components/Checkbox.vue'

type CheckedState = boolean | 'indeterminate'

const children = ref<Record<string, CheckedState>>({
  child1: true,
  child2: false,
})

/**
 * Keadaan kotak induknya dihitung, bukan disimpan: ia tercentang kalau kedua
 * anaknya tercentang, kosong kalau dua-duanya kosong, dan setengah kalau
 * keduanya berselisih.
 */
const parent = computed<CheckedState>(() =>
  children.value.child1 === children.value.child2 ? children.value.child1 : 'indeterminate',
)

function setChild(name: string, value: CheckedState) {
  children.value = { ...children.value, [name]: value }
}

function setParent(value: CheckedState) {
  children.value = { child1: value, child2: value }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center">
      <Checkbox id="parent" :model-value="parent" @update:model-value="setParent" />
      <label class="ml-2 font-medium text-sm leading-none" for="parent">
        Parent
      </label>
    </div>
    <div class="space-y-2 pl-6">
      <div class="flex items-center">
        <Checkbox
          id="child1"
          :model-value="children.child1"
          @update:model-value="setChild('child1', $event)"
        />
        <label class="ml-2 font-medium text-sm leading-none" for="child1">
          Child 1
        </label>
      </div>
      <div class="flex items-center">
        <Checkbox
          id="child2"
          :model-value="children.child2"
          @update:model-value="setChild('child2', $event)"
        />
        <label class="ml-2 font-medium text-sm leading-none" for="child2">
          Child 2
        </label>
      </div>
    </div>
  </div>
</template>
