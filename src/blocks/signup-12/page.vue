<script lang="ts">
export const description = "Halaman pendaftaran dua kolom dengan testimoni di sisi gambarnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GoogleLogo from '@/blocks/signup-12/components/GoogleLogo.vue'
import Logo from '@/blocks/signup-12/components/Logo.vue'
import SignUpForm from '@/blocks/signup-12/components/SignUpForm.vue'
import Testimonials from '@/blocks/signup-12/components/Testimonials.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
    <div class="flex h-screen items-center justify-center">
      <div class="mx-auto w-full max-w-md px-10 py-14 sm:rounded-2xl sm:border sm:bg-card sm:shadow-2xl/5">
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

        <p class="mt-6 text-center text-sm">
          Already have an account? 
          <a class="text-muted-foreground" href="#">
            Login
          </a>
        </p>
      </div>
    </div>
    <div class="relative flex h-full w-full flex-col overflow-hidden bg-muted/50 dark:bg-muted/30">
      <img
        alt="Sign up"
        class="absolute inset-0 size-full object-cover"
        src="/images/ascii-art.png"
      />

      <Testimonials />
    </div>
  </div>
</template>
