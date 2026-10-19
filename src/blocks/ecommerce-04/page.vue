<script lang="ts">
export const description = "Produk digital dengan breadcrumb, statistik ulasan, dan pilihan versi radio."
</script>

<script setup lang="ts">
import { EyeIcon, LockIcon, ShoppingCartIcon, StarIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const data = [
  {
    name: "HTML Version",
    desc: "Pure HTML/CSS with Tailwind, perfect for static websites.",
    price: "$39",
    popular: false,
  },
  {
    name: "React Version",
    desc: "React components with TypeScript support included.",
    price: "$49",
    popular: true,
  },
  {
    name: "Angular Version",
    desc: "Angular components with full type definitions.",
    price: "$99",
    popular: false,
  },
]
</script>

<template>
  <section class="container mx-auto py-16">
    <nav class="mb-8 flex items-center gap-2 text-sm">
      <a
        href="#"
        class="text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </a>
      <span class="text-muted-foreground">/</span>
      <a
        href="#"
        class="text-muted-foreground hover:text-foreground transition-colors"
      >
        Templates
      </a>
      <span class="text-muted-foreground">/</span>
      <span class="text-foreground font-medium">Digital Product</span>
    </nav>

    <div class="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="group bg-muted/30 relative overflow-hidden rounded-2xl border p-4 shadow-xl transition-all hover:shadow-2xl">
        <img
          src="/samples/photos/photo-23.svg"
          alt="Digital product preview"
          class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div class="flex flex-col">
        <div class="mb-6">
          <div class="mb-3 flex items-center gap-3">
            <h2 class="text-3xl font-bold tracking-tight">
              Premium UI Kit
            </h2>
            <Badge
              variant="secondary"
              class="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              Best Seller
            </Badge>
          </div>
          <p class="text-muted-foreground text-base leading-relaxed">
            A comprehensive collection of beautifully crafted components and
            templates. Built with modern web technologies and best practices
            for seamless integration.
          </p>
        </div>

        <div class="bg-muted/50 mb-6 flex items-center gap-6 rounded-lg p-4">
          <div class="flex items-center gap-2">
            <StarIcon class="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span class="text-sm font-semibold">4.9/5</span>
            <span class="text-muted-foreground text-sm">
              (127 reviews)
            </span>
          </div>
          <div class="bg-border h-4 w-px" />
          <div class="flex items-center gap-2 text-sm">
            <LockIcon class="text-muted-foreground h-4 w-4" />
            <span class="font-semibold">1,234</span>
            <span class="text-muted-foreground">sales</span>
          </div>
        </div>

        <div class="mb-6">
          <p class="mb-4 text-lg font-semibold">Choose your version</p>
          <RadioGroup default-value="React Version" class="gap-3">
            <div
              v-for="{ name, desc, price, popular } in data"
              :key="name"
              class="group/item bg-card hover:border-primary rounded-lg border transition-all hover:shadow-md"
            >
              <Label
                :for="name"
                class="flex cursor-pointer items-start gap-4 p-4"
              >
                <RadioGroupItem :id="name" :value="name" class="mt-1" />
                <div class="flex flex-1 items-center justify-between gap-4">
                  <div class="flex-1">
                    <div class="mb-1 flex items-center gap-2">
                      <p class="font-semibold">{{ name }}</p>
                      <Badge v-if="popular" class="bg-primary text-primary-foreground">
                        Popular
                      </Badge>
                    </div>
                    <p class="text-muted-foreground text-sm">{{ desc }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-2xl font-bold">{{ price }}</p>
                    <p class="text-muted-foreground text-xs">
                      one-time
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div class="mt-auto flex flex-col gap-3 sm:flex-row">
          <Button size="lg" class="flex-1 gap-2">
            <ShoppingCartIcon class="h-4 w-4" />
            Buy Now
          </Button>
          <Button size="lg" variant="outline" class="flex-1 gap-2">
            <EyeIcon class="h-4 w-4" />
            Live Preview
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
