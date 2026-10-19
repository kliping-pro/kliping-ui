<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { GalleryVerticalEnd } from "@lucide/vue"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <form>
      <FieldGroup>
        <div class="flex flex-col items-center gap-2 text-center">
          <a
            href="#"
            class="flex flex-col items-center gap-2 font-medium"
          >
            <div class="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd class="size-6" />
            </div>
            <span class="sr-only">Acme Inc.</span>
          </a>
          <h1 class="text-xl font-bold">
            Enter verification code
          </h1>
          <FieldDescription>
            We sent a 6-digit code to your email address
          </FieldDescription>
        </div>
        <Field>
          <FieldLabel for="otp" class="sr-only">
            Verification code
          </FieldLabel>
          <!-- Deret kotak 48×64 sumbernya butuh 368px, baru muat di layar
               ±416px. Kotaknya tetap selebar w-12, tapi boleh menyusut
               (min-w-0) dan tingginya mengikuti rasio 3:4, jadi di layar yang
               lebih sempit kotaknya mengecil alih-alih meluap; di bawah 26rem
               jaraknya juga dirapatkan. Mulai lebar itu ukurannya tetap. -->
          <InputOTP
            id="otp"
            :maxlength="6"
            required
          >
            <InputOTPGroup class="min-w-0 gap-2.5 max-[26rem]:gap-1.5 *:data-[slot=input-otp-slot]:aspect-3/4 *:data-[slot=input-otp-slot]:h-auto *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:min-w-0 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot :index="0" />
              <InputOTPSlot :index="1" />
              <InputOTPSlot :index="2" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup class="min-w-0 gap-2.5 max-[26rem]:gap-1.5 *:data-[slot=input-otp-slot]:aspect-3/4 *:data-[slot=input-otp-slot]:h-auto *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:min-w-0 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot :index="3" />
              <InputOTPSlot :index="4" />
              <InputOTPSlot :index="5" />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription class="text-center">
            Didn't receive the code? <a href="#">Resend</a>
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">
            Verify
          </Button>
        </Field>
      </FieldGroup>
    </form>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
