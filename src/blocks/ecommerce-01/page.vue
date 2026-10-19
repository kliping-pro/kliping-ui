<script lang="ts">
export const description = "Checkout dua kolom: formulir kontak, alamat, pembayaran, dan ringkasan pesanan sticky."
</script>

<script setup lang="ts">
import {
  CreditCardIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PackageIcon,
  ShoppingBagIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const OPTIONS = [
  {
    image: "/samples/products/product-03.svg",
    title: "Classic Suit",
    description: "Silk",
    size: "M",
    price: "$1,300",
    quantity: 1,
  },
  {
    image: "/samples/products/product-07.svg",
    title: "Premium Suit",
    description: "Linen",
    size: "M",
    price: "$790",
    quantity: 1,
  },
]

const PRICE_OPTIONS = [
  { value: "Subtotal", price: "$2,090" },
  { value: "Shipping estimate", price: "$0" },
  { value: "Tax estimate", price: "$5" },
]
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Checkout</h1>
        <p class="text-muted-foreground mt-2">
          Complete your order by providing your payment details
        </p>
      </div>

      <div class="rounded-2xl border bg-white p-6 shadow-lg md:p-8 lg:p-12 dark:bg-gray-950">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="space-y-8">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <MailIcon class="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Contact</h3>
                  <p class="text-muted-foreground text-sm">
                    We'll send order updates here
                  </p>
                </div>
              </div>
              <div class="space-y-2">
                <Label for="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  class="h-11"
                />
              </div>
              <div class="flex items-start gap-2">
                <Checkbox id="terms" class="mt-1" />
                <Label
                  for="terms"
                  class="text-muted-foreground text-sm leading-relaxed"
                >
                  I agree to the
                  <a href="#" class="text-primary hover:underline">
                    Terms &amp; Conditions
                  </a>
                  and
                  <a href="#" class="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            <Separator />

            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <MapPinIcon class="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Shipping Address</h3>
                  <p class="text-muted-foreground text-sm">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    class="h-11"
                  />
                </div>
                <div class="grid gap-4 sm:grid-cols-3">
                  <div class="space-y-2">
                    <Label for="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      class="h-11"
                    />
                  </div>
                  <div class="space-y-2">
                    <Label for="postal">Postal Code</Label>
                    <Input id="postal" placeholder="10001" class="h-11" />
                  </div>
                  <div class="space-y-2">
                    <Label for="country">Country</Label>
                    <Input id="country" placeholder="USA" class="h-11" />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <CreditCardIcon class="text-primary h-5 w-5" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold">Payment Details</h3>
                  <p class="text-muted-foreground text-sm">
                    Your payment information is secure
                  </p>
                </div>
                <Badge
                  variant="outline"
                  class="gap-1 border-green-500/30 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                >
                  <LockIcon class="h-3 w-3" />
                  Secure
                </Badge>
              </div>
              <div class="space-y-4">
                <div class="space-y-2">
                  <Label for="card">Card Number</Label>
                  <Input
                    id="card"
                    placeholder="1234 5678 9012 3456"
                    class="h-11"
                  />
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="space-y-2">
                    <Label for="expiry">Expiration Date</Label>
                    <Input id="expiry" placeholder="MM/YY" class="h-11" />
                  </div>
                  <div class="space-y-2">
                    <Label for="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" class="h-11" />
                  </div>
                </div>
              </div>
            </div>

            <Button class="mt-4 h-12 w-full text-base" size="lg">
              <LockIcon class="mr-2 h-4 w-4" />
              Place Order - $2,095
            </Button>
          </div>

          <div class="lg:sticky lg:top-8 lg:h-fit">
            <div class="bg-muted/30 rounded-xl border p-6">
              <div class="mb-6 flex items-center gap-3">
                <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <ShoppingBagIcon class="text-primary h-5 w-5" />
                </div>
                <h2 class="text-xl font-bold">Order Summary</h2>
              </div>

              <div class="space-y-4">
                <div
                  v-for="({ image, title, description, size, price, quantity }, index) in OPTIONS"
                  :key="index"
                  class="bg-background hover:bg-muted/50 flex items-start gap-4 rounded-lg border p-3 transition-colors"
                >
                  <div class="relative h-20 w-20 overflow-hidden rounded-md border">
                    <img
                      :src="image"
                      :alt="title"
                      class="h-full w-full object-cover p-1"
                    >
                  </div>
                  <div class="flex-1 space-y-1">
                    <p class="leading-tight font-semibold">{{ title }}</p>
                    <p class="text-muted-foreground text-sm">
                      {{ description }} · Size {{ size }}
                    </p>
                    <p class="text-muted-foreground text-xs">
                      Qty: {{ quantity }}
                    </p>
                  </div>
                  <p class="font-semibold">{{ price }}</p>
                </div>
              </div>

              <Separator class="my-6" />

              <div class="space-y-3">
                <div v-for="{ value, price } in PRICE_OPTIONS" :key="value" class="flex justify-between text-sm">
                  <span class="text-muted-foreground">{{ value }}</span>
                  <span class="font-medium">{{ price }}</span>
                </div>
              </div>

              <Separator class="my-4" />

              <div class="flex items-center justify-between">
                <span class="text-lg font-bold">Total</span>
                <span class="text-2xl font-bold">$2,095</span>
              </div>

              <div class="bg-muted/50 mt-6 flex items-start gap-2 rounded-lg p-4">
                <PackageIcon class="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div class="space-y-1">
                  <p class="text-sm font-medium">Free Shipping</p>
                  <p class="text-muted-foreground text-xs">
                    Your order qualifies for free standard shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
