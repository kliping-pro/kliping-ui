<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon, LockIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

defineProps<{
  id: string
  label: string
}>()

const model = defineModel<string | number>()

const showPassword = ref(false)
</script>

<template>
  <div class="mb-6 space-y-2">
    <Label :for="id" class="flex items-center gap-2">
      <LockIcon class="text-muted-foreground h-4 w-4" />
      {{ label }}
    </Label>
    <div class="relative">
      <Input
        :id="id"
        v-model="model"
        :type="showPassword ? 'text' : 'password'"
        placeholder="••••••••"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        @click="showPassword = !showPassword"
      >
        <EyeOffIcon v-if="showPassword" class="h-4 w-4" aria-hidden="true" />
        <EyeIcon v-else class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">
          {{ showPassword ? "Hide password" : "Show password" }}
        </span>
      </Button>
    </div>
  </div>
</template>
