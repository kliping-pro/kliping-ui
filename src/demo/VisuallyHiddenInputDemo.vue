<script setup lang="ts">
import { ref } from 'vue'
import { VisuallyHiddenInput } from '@/components/visually-hidden-input'
import { Button } from '@/components/ui/button'

const intensity = ref('medium')
const submitted = ref<string | null>(null)

const options = ['light', 'medium', 'heavy']

function handleSubmit(event: Event) {
  const data = new FormData(event.target as HTMLFormElement)
  submitted.value = String(data.get('intensity') ?? '')
}
</script>

<template>
  <form class="flex flex-col items-start gap-3" @submit.prevent="handleSubmit">
    <!--
      Deretan tombol ini bukan elemen formulir, jadi nilainya tidak akan pernah
      sampai ke `FormData` dengan sendirinya. Masukan tersembunyi di bawahnya
      yang membawanya.
    -->
    <div class="flex gap-2" role="group">
      <Button
        v-for="option in options"
        :key="option"
        type="button"
        :variant="intensity === option ? 'default' : 'outline'"
        @click="intensity = option"
      >
        {{ option }}
      </Button>
    </div>

    <VisuallyHiddenInput name="intensity" type="hidden" :value="intensity" />

    <Button type="submit" variant="secondary">
      Submit form
    </Button>

    <p v-if="submitted" class="text-muted-foreground text-sm">
      Submitted: <strong>{{ submitted }}</strong>
    </p>
  </form>
</template>
