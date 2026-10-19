<script lang="ts">
export const description = "Konfirmasi lengkap dengan rincian barang dan gambar."
</script>

<script setup lang="ts">
import { Check } from '@lucide/vue'
import { Separator } from '@/components/ui/separator'

interface OrderItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const orderItems: OrderItem[] = [
  {
    id: "070",
    imageSrc: "/samples/photos/photo-19.svg",
    imageAlt: "iPhone 15 Pro",
    name: "iPhone 15 Pro",
    description: "6.1-inch Super Retina XDR display with ProMotion.",
    price: 999,
    quantity: 2,
  },
  {
    id: "010",
    imageSrc: "/samples/photos/photo-20.svg",
    imageAlt: "AirPods Pro",
    name: "AirPods Pro",
    description: "Active Noise Cancellation with Adaptive Transparency.",
    price: 249,
    quantity: 1,
  },
  {
    id: "012",
    imageSrc: "/samples/photos/photo-21.svg",
    imageAlt: "MacBook Air M2",
    name: "MacBook Air M2",
    description: "13-inch laptop with M2 chip and 8GB unified memory.",
    price: 1199,
    quantity: 1,
  },
]

const total = orderItems.reduce( (sum, item) => sum + item.price * item.quantity, 0 )

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="mx-auto flex w-full max-w-lg flex-col items-center bg-background px-6 pt-8 pb-10 text-center shadow-lg/5 sm:rounded-xl sm:border md:px-8">
      <div class="flex size-12 items-center justify-center rounded-full border border-green-500/12 bg-green-500/10">
        <Check class="size-6 text-green-500" />
      </div>
      <p class="mt-7 font-medium text-3xl tracking-tight">
        Thank you for your purchase!
      </p>
      <p class="mt-4 text-muted-foreground text-sm sm:text-base">
        We've sent you an email with your order details to 
        <span class="font-medium text-foreground">order@example.com</span>
        .
      </p>

      <div class="mt-12 flex w-full flex-col gap-8">
        <div v-for="item in orderItems" class="flex items-center gap-4" :key="item.id">
          <div class="flex aspect-square w-14 shrink-0 items-center justify-center rounded-xl border-border/30 bg-secondary shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] sm:w-18">
            <img
              :alt="item.imageAlt"
              class="size-full select-none rounded-xl object-cover"
              :src="item.imageSrc"
            />
          </div>
          <div class="text-start">
            <p class="font-medium">{{ item.name }}</p>
            <p class="line-clamp-2 text-muted-foreground text-sm">
              {{ item.description }}
            </p>
          </div>
          <div class="ms-auto flex flex-col items-end">
            <p class="font-medium text-foreground">
              {{ formatCurrency(item.price) }}
            </p>
            <p class="text-muted-foreground text-sm">
              &times;{{ item.quantity }}
            </p>
          </div>
        </div>
        <Separator />
        <div class="flex items-center justify-between">
          <p class="text-muted-foreground">Total</p>
          <p class="font-medium text-foreground">
            {{ formatCurrency(total) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
