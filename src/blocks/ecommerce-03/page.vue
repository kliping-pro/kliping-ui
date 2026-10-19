<script lang="ts">
export const description = "Ikhtisar produk berlatar gelap dengan harga diskon, tab info, dan foto di kanan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon, PackageIcon, ShieldIcon, ShoppingCartIcon, StarIcon, TruckIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DATA = [
  {
    title: "Features",
    icon: PackageIcon,
    desc: `Premium cashmere blend with cable-knit pattern. Features a classic V-neck design,
    ribbed cuffs and hem for a perfect fit. Made with sustainable materials and ethically sourced
    fibers. Temperature-regulating properties keep you comfortable in any season.`,
  },
  {
    title: "Product Care",
    icon: ShieldIcon,
    desc: `Hand wash in cold water with mild detergent or dry clean for best results.
    Lay flat to dry, do not wring or twist. Store folded in a cool, dry place.
    Use a fabric shaver to remove any pilling. Steam gently to refresh between wears.`,
  },
  {
    title: "Shipping",
    icon: TruckIcon,
    desc: `Free standard shipping on all orders over $100. Express shipping available at checkout.
    Orders are processed within 1-2 business days. International shipping available to select countries.
    30-day hassle-free returns and exchanges.`,
  },
]

const isFavorite = ref(false)
</script>

<template>
  <section class="bg-primary container mx-auto rounded-2xl">
    <div class="mx-auto max-w-6xl px-6 py-20 md:px-12">
      <div class="mb-16 text-center">
        <Badge
          variant="outline"
          class="mb-4 border-white/30 bg-white/5 text-white"
        >
          Shop Previewer
        </Badge>
        <h2 class="my-4 text-4xl font-bold tracking-tight text-white">
          New Collection
        </h2>
        <p class="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
          Easily preview furniture, decor, and more in your space, ensuring
          everything fits perfectly and looks just right. It's the
          ultimate tool for hassle-free home customization and design!
        </p>
      </div>

      <div class="flex flex-col items-center justify-between gap-x-12 gap-y-12 lg:flex-row">
        <div class="w-full min-w-0 flex-1">
          <div class="mb-4 flex flex-wrap items-center gap-3">
            <h3 class="text-2xl font-bold text-white">Elegant Suite</h3>
            <Badge class="bg-green-700 text-white">New Arrival</Badge>
          </div>

          <div class="mb-4 flex items-center gap-2">
            <div class="flex items-center gap-1">
              <StarIcon
                v-for="star in [1, 2, 3, 4, 5]"
                :key="star"
                class="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            </div>
            <span class="text-sm text-white/90">(127 reviews)</span>
          </div>

          <div class="mb-6 flex flex-wrap items-baseline gap-3">
            <p class="text-4xl font-bold text-white">$449.90</p>
            <span class="text-lg text-white/90 line-through">
              $599.90
            </span>
            <Badge
              variant="outline"
              class="border-green-300/40 bg-green-950/20 text-green-100"
            >
              25% OFF
            </Badge>
          </div>

          <p class="mb-8 max-w-xl text-lg leading-relaxed text-white/90">
            Add a touch of sophistication to your home with our handcrafted
            ceramic vase. Each piece is uniquely made, blending seamlessly
            into both modern and classic decors.
          </p>

          <div class="mb-8 flex items-center gap-2 rounded-lg bg-white/5 p-4">
            <TruckIcon class="h-5 w-5 shrink-0 text-white" />
            <span class="text-sm text-white">
              Free shipping on orders over $100
            </span>
          </div>

          <div class="mb-4 flex w-full items-center gap-3">
            <Button
              size="lg"
              class="flex-1 gap-2 bg-white text-black hover:bg-white/90 sm:w-64 sm:flex-none"
            >
              <ShoppingCartIcon class="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
              :aria-pressed="isFavorite"
              size="lg"
              variant="ghost"

              :class="`shrink-0 ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-white/80 hover:text-red-500'
              }`"
              @click="isFavorite = !isFavorite"
            >
              <HeartIcon
                :class="`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`"
              />
            </Button>
          </div>

          <div class="mt-12 max-w-2xl">
            <Tabs default-value="Features" class="w-full">
              <TabsList class="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-white/20 bg-transparent p-0">
                <TabsTrigger
                  v-for="{ title, icon } in DATA"
                  :key="title"
                  :value="title"
                  class="gap-2 rounded-none px-4 py-3 text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <component :is="icon" class="h-4 w-4" />
                  {{ title }}
                </TabsTrigger>
              </TabsList>
              <TabsContent
                v-for="{ title, desc } in DATA"
                :key="title"
                :value="title"
                class="mt-6 text-white/90"
              >
                <p class="leading-relaxed">{{ desc }}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div class="w-full lg:w-auto lg:max-w-lg">
          <div class="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
            <img
              src="/samples/photos/photo-16.svg"
              alt="Elegant Suite"
              class="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
