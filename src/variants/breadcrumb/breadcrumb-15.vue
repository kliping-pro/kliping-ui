<script lang="ts">
export const description = "Penanda langkah: ikon bulat dihubungkan garis mendatar."
</script>

<script setup lang="ts">
import { Package, ShoppingCart, Store, Truck } from '@lucide/vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

const steps = [
  {
    label: "Store",
    href: "#",
    icon: Store,
  },
  {
    label: "Delivery Tracking",
    href: "#",
    icon: Truck,
  },
  {
    label: "Cart",
    href: "#",
    icon: ShoppingCart,
  },
  {
    label: "Package",
    href: "#",
    icon: Package,
    active: true,
  },
]
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(step, index) in steps" :key="index">
        <BreadcrumbItem>
          <BreadcrumbPage v-if="step.active">
            <component :is="step.icon" class="h-5 w-5" />
          </BreadcrumbPage>
          <BreadcrumbLink v-else :href="step.href">
            <component :is="step.icon" class="h-5 w-5" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <li v-if="index !== steps.length - 1"
          aria-hidden="true"
          class="inline-block h-[2px] w-[40px] bg-muted"
          role="presentation"
        />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
