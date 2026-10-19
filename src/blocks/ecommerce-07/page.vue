<script lang="ts">
export const description = "Keranjang belanja kosong dengan ilustrasi di tengah dan tombol kembali ke toko."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="grid min-h-screen place-items-center justify-center">
    <div class="container mx-auto py-16">
      <div class="text-center">
        <p class="text-primary font-semibold">Store</p>
        <h2 class="mt-4 text-2xl font-bold">
          Your Shopping Cart is Empty
        </h2>
        <img
          src="/samples/products/product-01.svg"
          alt="Empty cart"
          class="mx-auto my-8 max-h-[30rem]"
        >
        <Button>Back to Store</Button>
      </div>
    </div>
  </section>
</template>
