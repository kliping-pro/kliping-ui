<script lang="ts">
export const description = "Kelompok isian berikon, dengan tombol intip kata sandi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@lucide/vue'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from '@/components/ui/button'

const showPassword = ref(false)

function setShowPassword(value: typeof showPassword['value']) {
  showPassword.value = value
}

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword.value);
  }
</script>

<template>
  <div class="w-full max-w-xs space-y-2">
    <!-- <div class="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2"> -->
    <InputGroup>
      <InputGroupAddon>
        <MailIcon class="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        class="border-0 shadow-none focus-visible:ring-0"
        placeholder="Email"
        type="email"
      />
    </InputGroup>
    <!-- </div> -->
    <InputGroup>
      <InputGroupAddon>
        <LockIcon class="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        class="border-0 shadow-none focus-visible:ring-0"
        placeholder="Password"
        :type="showPassword ? 'text' : 'password'"
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton @click="togglePasswordVisibility">
          <EyeOffIcon v-if="showPassword" class="size-4 text-muted-foreground" />
          <EyeIcon v-else class="size-4 text-muted-foreground" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <Button class="w-full">Log In</Button>
  </div>
</template>
