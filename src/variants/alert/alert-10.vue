<script lang="ts">
export const description = "Ada tombol silang; menutupnya menyisakan tautan untuk membukanya lagi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CircleFadingArrowUpIcon, XIcon } from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const isAlertVisible = ref(true)

function setIsAlertVisible(value: typeof isAlertVisible['value']) {
  isAlertVisible.value = value
}

const showAlert = () => {
    setIsAlertVisible(true);
  }

const hideAlert = () => {
    setIsAlertVisible(false);
  }
</script>

<template>
  <div class="w-full">
    <Alert v-if="isAlertVisible" class="flex items-center justify-between pr-2 [&>svg+div]:translate-y-0">
      <div class="flex items-start gap-3">
        <CircleFadingArrowUpIcon class="mt-0.5 size-4" />
        <div class="flex-col justify-center">
          <AlertTitle>Update Available</AlertTitle>
          <AlertDescription>
            A new version of the app is now available.
          </AlertDescription>
        </div>
      </div>
      <Button
        class="pl-0!"
        @click="hideAlert"
        size="icon"
        variant="ghost"
      >
        <XIcon class="h-5 w-5" />
      </Button>
    </Alert>
    <div v-if="!isAlertVisible" class="flex justify-center">
      <Button class="mx-auto mt-2" @click="showAlert">
        Reopen
      </Button>
    </div>
  </div>
</template>
