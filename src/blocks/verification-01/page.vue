<script lang="ts">
export const description = "Halaman verifikasi surel dengan tombol kirim ulang."
</script>

<script setup lang="ts">
import { ApertureIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="w-full max-w-sm border bg-card max-[32rem]:max-w-none max-[32rem]:border-x-0">
      <div
        :class="cn(
          'flex w-full items-center justify-center gap-3 border-b py-4 font-medium text-[1.35rem] tracking-tight',
          'bg-[repeating-linear-gradient(315deg,color-mix(in_oklch,var(--border)_35%,transparent)_0,color-mix(in_oklch,var(--border)_35%,transparent)_1px,transparent_0,transparent_50%)] bg-[size:10px_10px] bg-fixed'
        )"
      >
        <ApertureIcon class="size-7" /> Acme UI
      </div>
      <div class="mx-auto flex max-w-[21rem] flex-col items-center px-6 py-10 text-center">
        <b class="font-medium text-[1.4rem] tracking-[-0.01em]">
          Verify your email address
        </b>
        <p class="mt-1.5 text-pretty text-muted-foreground">
          We've sent a verification code to your email address.
        </p>

        <InputOTP container-class="mx-auto mt-10" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot :index="1" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot :index="2" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot :index="4" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>

        <Button class="mt-10 w-full">Verify</Button>

        <p class="mt-8 text-muted-foreground text-sm">
          Didn't receive the code? 
          <a class="text-primary underline" href="#">
            Resend
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
