<script lang="ts">
export const description = "Konfirmasi ringkas dengan nomor pesanan dan tombol lacak."
</script>

<script setup lang="ts">
import { Check, Eye, Home } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div class="mx-auto flex w-full max-w-sm flex-col items-center rounded-xl border bg-card px-6 pt-8 pb-10 text-center">
      <div class="flex size-12 items-center justify-center rounded-full border border-green-500/12 bg-green-500/10">
        <Check class="size-6 text-green-500" />
      </div>
      <p class="mt-5 font-medium text-2xl">Order Confirmed!</p>
      <p class="mt-2 text-muted-foreground text-sm sm:text-base">
        Thank you for your purchase. We've sent a confirmation to your email.
      </p>

      <div class="mt-12 flex flex-wrap items-center gap-2">
        <Button class="grow">
          <Eye /> View Order
        </Button>
        <Button class="grow" variant="outline">
          <Home /> Go to Home
        </Button>
      </div>
    </div>
  </div>
</template>
