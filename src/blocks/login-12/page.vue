<script lang="ts">
export const description = "Halaman masuk dua kolom dengan testimoni di sisi gambarnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GoogleLogo from '@/blocks/login-12/components/GoogleLogo.vue'
import LoginForm from '@/blocks/login-12/components/LoginForm.vue'
import Logo from '@/blocks/login-12/components/Logo.vue'
import Testimonials from '@/blocks/login-12/components/Testimonials.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
    <div class="flex h-screen items-center justify-center">
      <div class="mx-auto w-full max-w-md px-10 py-14 sm:rounded-2xl sm:border sm:bg-card sm:shadow-2xl/5">
        <Logo class="mx-auto size-9" />
        <h1 class="mt-3 text-center font-medium text-2xl tracking-[-0.015em]">
          Login to Acme UI
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

          <LoginForm />
        </div>

        <a
          class="mt-6 block text-center text-muted-foreground text-sm"
          href="#"
        >
          Forgot your password?
        </a>

        <p class="mt-6 text-center text-sm">
          New to Bloxxee? 
          <a class="text-muted-foreground" href="#">
            Create an account
          </a>
        </p>
      </div>
    </div>
    <div class="relative flex h-full w-full flex-col overflow-hidden bg-muted/50 dark:bg-muted/30">
      <img
        alt="Login"
        class="absolute inset-0 size-full object-cover"
        src="/images/ascii-art.png"
      />

      <Testimonials />

      <!-- <div
        class="absolute inset-0 -top-px -left-px -z-1 dark:opacity-70"
        :style="{
          backgroundImage: `
        linear-gradient(to right, color-mix(in srgb,var(--foreground) 20%, transparent) 1px, transparent 1px),
        linear-gradient(to bottom, color-mix(in srgb,var(--foreground) 20%, transparent) 1px, transparent 1px)
      `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }"
      /> -->
    </div>
  </div>
</template>
