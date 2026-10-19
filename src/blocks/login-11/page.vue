<script lang="ts">
export const description = "Halaman masuk lengkap dengan bilah navigasi di atasnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GoogleLogo from '@/blocks/login-11/components/GoogleLogo.vue'
import LoginForm from '@/blocks/login-11/components/LoginForm.vue'
import Logo from '@/blocks/login-11/components/Logo.vue'
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="mx-auto w-full max-w-md px-10 py-14 sm:rounded-2xl sm:border sm:border-border/80 sm:bg-card sm:shadow-[0_0_2px_1px_var(--color-muted)]">
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
</template>
