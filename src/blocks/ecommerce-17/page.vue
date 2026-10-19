<script lang="ts">
export const description = "Detail produk sederhana dua kolom, accordion info tambahan, dan dua kartu item serupa."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { HeartIcon } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

const SIMILAR_ITEMS = [
  {
    name: "Black Bustier Top",
    price: "€49.95",
    image:
      "/samples/avatars/avatar-13.svg",
    sizes: "Available in 5 size",
  },
  {
    name: "Black High-Waist Jeans",
    price: "€49.95",
    image:
      "/samples/avatars/avatar-14.svg",
    sizes: "Available in 8 taille",
  },
]

const selectedSize = ref("M")
const isFavorite = ref(false)
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <!-- Main Product Section -->
      <div class="mb-16 grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2">
        <div class="bg-muted/30 h-full max-h-[32rem] w-full overflow-hidden rounded-xl border">
          <img
            alt="Pink Blouse"
            src="/samples/photos/photo-13.svg"
            class="h-full w-full object-cover"
          >
        </div>
        <div class="md:p-2">
          <h3 class="text-3xl font-bold">Pink Blouse</h3>
          <p class="text-primary my-4 text-3xl font-bold">$1,490</p>
          <p class="text-muted-foreground leading-relaxed [text-wrap:_balance]">
            Whether you're closing deals or attending formal events, its
            breathable lining and natural stretch keep you comfortable and
            sharp from day to night.
          </p>

          <div class="my-6 flex items-center gap-2">
            <div class="flex">
              <svg
                v-for="star in [1, 2, 3, 4]"
                :key="star"
                class="h-5 w-5 fill-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
            <p class="text-sm font-semibold">100 Reviews</p>
          </div>

          <div class="mb-6">
            <h4 class="mb-3 text-lg font-semibold">Size</h4>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="size in SIZES"
                :key="size"
                :variant="selectedSize === size ? 'default' : 'outline'"
                size="sm"
                class="min-w-[3rem]"
                @click="selectedSize = size"
              >
                {{ size }}
              </Button>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="mb-3 text-lg font-semibold">Color</h4>
            <div class="flex gap-2">
              <div class="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 bg-black transition-transform hover:scale-110" />
              <div class="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 bg-white transition-transform hover:scale-110" />
              <div class="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 bg-gray-200 transition-transform hover:scale-110" />
            </div>
          </div>

          <div class="mt-8 flex items-center gap-3">
            <Button class="min-w-0 max-w-sm flex-1" size="lg">
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
              :aria-pressed="isFavorite"
              :class="`h-11 w-11 ${

                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-muted-foreground hover:text-red-500'
              }`"
              @click="isFavorite = !isFavorite"
            >
              <HeartIcon
                :class="`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`"
              />
            </Button>
          </div>
        </div>
      </div>

      <!-- More Info & Similar Items Section -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- More Info Section -->
        <div>
          <h3 class="mb-6 text-2xl font-bold">More Info</h3>
          <Accordion
            type="single"
            collapsible
            default-value="description"
            class="w-full"
          >
            <AccordionItem value="description">
              <AccordionTrigger class="text-base font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent class="text-muted-foreground leading-relaxed">
                <p class="mb-4">
                  Whether you're navigating city streets or embarking on
                  outdoor adventures, this puffer jacket ensures you stay cozy
                  and comfortable wherever you go. The versatile black hue
                  effortlessly complements any outfit, making it a go-to
                  choice for everyday wear.
                </p>
                <p>
                  Equipped with practical features, including a front zipper
                  closure and zippered pockets, the MidnightShield Jacket
                  offers convenient storage for your essentials while on the
                  move. Its adjustable cuffs and hem allow for a customizable
                  fit, ensuring maximum comfort and versatility.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery">
              <AccordionTrigger class="text-base font-semibold">
                Delivery &amp; Returns
              </AccordionTrigger>
              <AccordionContent class="text-muted-foreground leading-relaxed">
                <p class="mb-4">
                  <strong>Free Standard Delivery:</strong> Orders over $100
                  qualify for free standard shipping. Delivery typically takes
                  3-5 business days.
                </p>
                <p class="mb-4">
                  <strong>Express Shipping:</strong> Available at checkout for
                  faster delivery (1-2 business days).
                </p>
                <p>
                  <strong>Returns:</strong> We offer a 30-day return policy.
                  Items must be in original condition with tags attached. Free
                  returns for defective items.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" class="border-b-0">
              <AccordionTrigger class="text-base font-semibold">
                Contact Us
              </AccordionTrigger>
              <AccordionContent class="text-muted-foreground leading-relaxed">
                <p class="mb-3">
                  Have questions about this product? We're here to help!
                </p>
                <p class="mb-2">
                  <strong>Email:</strong> support@example.com
                </p>
                <p class="mb-2">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Hours:</strong> Mon-Fri, 9AM-6PM EST
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <!-- Similar Items Section -->
        <div>
          <h3 class="mb-6 text-2xl font-bold">Similar Items</h3>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card
              v-for="(item, index) in SIMILAR_ITEMS"
              :key="index"
              class="group cursor-pointer overflow-hidden py-0 transition-shadow hover:shadow-lg"
            >
              <CardContent class="p-0">
                <div class="bg-muted aspect-[4/5] overflow-hidden">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  >
                </div>
                <div class="p-4">
                  <h4 class="font-semibold tracking-wide uppercase">
                    {{ item.name }}
                  </h4>
                  <p class="mt-2 text-lg font-bold">{{ item.price }}</p>
                  <p class="text-muted-foreground mt-2 text-sm">
                    {{ item.sizes }}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
