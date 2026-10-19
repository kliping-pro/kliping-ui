<script lang="ts">
export const description = "Halaman pendaftaran dengan navigasi dan footer, satu halaman utuh."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GoogleLogo from '@/blocks/signup-13/components/GoogleLogo.vue'
import Logo from '@/blocks/signup-13/components/Logo.vue'
import SignUpForm from '@/blocks/signup-13/components/SignUpForm.vue'
</script>

<template>
  <div class="flex h-screen items-center justify-center py-12">
    <div class="mx-auto w-full border border-border/70 pb-0 max-sm:border-t-0 sm:max-w-md sm:rounded-xl sm:bg-card sm:p-1 sm:shadow-lg/3">
      <div class="border border-border/70 bg-muted/60 px-10 py-14 max-sm:border-x-0 sm:rounded-lg sm:shadow-sm/2">
        <Logo class="mx-auto size-9" />
        <h1 class="mt-3 text-center font-medium text-2xl tracking-[-0.015em]">
          Sign up to Acme UI
        </h1>

        <div class="mt-10">
          <Button class="w-full" size="lg" type="button">
            <GoogleLogo class="mr-2 size-4" />
            Continue with Google
          </Button>

          <div class="my-6 flex items-center justify-center gap-2 overflow-hidden">
            <Separator />
            <span class="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>

          <SignUpForm />
        </div>
      </div>

      <div class="relative py-5">
        <div
          class="absolute inset-0 z-0"
          :style="{
            backgroundImage: `
        linear-gradient(45deg, transparent 49%, var(--border) 49%, var(--border) 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, var(--border) 49%, var(--border) 51%, transparent 51%)
      `,
            backgroundSize: '40px 40px',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 90%)',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 90%)',
          }"
        />

        <p class="relative isolate text-center text-muted-foreground text-sm">
          Already have an account? 
          <a class="text-foreground" href="#">
            Login
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
