<script lang="ts">
export const description = "Keranjang belanja dalam card besar: daftar item berpilihan jumlah dan ringkasan pesanan sticky."
</script>

<script setup lang="ts">
import { LockIcon, PackageIcon, ShoppingBagIcon, TagIcon, TruckIcon, XIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const CHECKOUT_PRODUCTS = [
  {
    name: "Wool Suit",
    price: "$1,300",
    product: "Silk",
    size: "XS",
    img: "/samples/products/product-03.svg",
    stock: "In Stock",
  },
  {
    name: "Premium Suit",
    price: "$700",
    product: "Linen",
    size: "M",
    img: "/samples/products/product-07.svg",
    stock: "In Stock",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <Card class="rounded-2xl shadow-lg">
        <CardHeader class="text-center">
          <div class="mb-4 flex items-center justify-center gap-2">
            <div class="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full">
              <ShoppingBagIcon class="text-primary h-7 w-7" />
            </div>
          </div>
          <CardTitle class="text-4xl">Shopping Cart</CardTitle>
          <div class="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-2.5">
            <TruckIcon class="h-5 w-5 text-green-600" />
            <p class="text-sm font-semibold text-green-700">
              You are eligible for Free Shipping
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="col-span-2">
              <Card class="border-2">
                <CardHeader class="gap-0 border-b px-6">
                  <div class="flex items-center gap-2">
                    <PackageIcon class="text-primary h-5 w-5" />
                    <CardTitle class="text-xl">
                      Cart Items ({{ CHECKOUT_PRODUCTS.length }})
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent class="p-0">
                  <div
                    v-for="({ name, price, img, product, size, stock }, index) in CHECKOUT_PRODUCTS"
                    :key="index"
                  >
                    <div class="p-6">
                      <div class="flex flex-col items-stretch gap-6 sm:flex-row">
                        <div class="bg-muted/50 h-36 w-36 shrink-0 overflow-hidden rounded-xl p-3">
                          <img
                            :src="img"
                            :alt="name"
                            class="h-full w-full object-cover"
                          >
                        </div>
                        <div class="flex h-auto flex-1 flex-col gap-4">
                          <div class="flex items-start justify-between gap-4">
                            <div class="flex-1">
                              <h4 class="text-xl font-bold">
                                {{ name }}
                              </h4>
                              <p class="text-muted-foreground mt-1.5 text-sm">
                                {{ product }}
                              </p>
                            </div>
                            <Button
                              aria-label="Remove item"
                              size="icon"
                              variant="ghost"
                              class="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-9 w-9 rounded-full"
                            >
                              <XIcon class="h-5 w-5" />
                            </Button>
                          </div>

                          <div class="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              class="gap-1.5 px-3 py-1"
                            >
                              <span class="text-xs">Size:</span>
                              <span class="font-semibold">
                                {{ size }}
                              </span>
                            </Badge>
                            <Badge class="gap-1.5 border-green-200 bg-green-50 px-3 py-1 text-green-700 hover:bg-green-100">
                              {{ stock }}
                            </Badge>
                          </div>

                          <div class="mt-auto flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <span class="text-muted-foreground text-sm font-medium">
                                Quantity:
                              </span>
                              <Select default-value="1">
                                <SelectTrigger aria-label="Quantity" class="h-10 w-28">

                                  <SelectValue placeholder="Qty" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <p class="text-primary text-2xl font-bold">
                              {{ price }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator v-if="index < CHECKOUT_PRODUCTS.length - 1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div class="col-span-1">
              <div class="sticky top-4">
                <Card class="border-2">
                  <CardHeader class="gap-0 border-b px-6">
                    <CardTitle class="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent class="p-0">
                    <div class="space-y-4 p-6">
                      <div class="flex items-center justify-between">
                        <span class="text-muted-foreground">
                          Subtotal
                        </span>
                        <span class="font-semibold">$2,090</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-muted-foreground">
                          Shipping Tax
                        </span>
                        <span class="font-semibold text-green-700 dark:text-green-500">
                          $0
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div class="p-6">
                      <div class="mb-3 flex items-center gap-2">
                        <TagIcon class="text-muted-foreground h-4 w-4" />
                        <label class="text-sm font-semibold">
                          Promo Code
                        </label>
                      </div>
                      <div class="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="Enter code"
                          class="flex-1"
                        />
                        <Button variant="outline" class="shrink-0">
                          Apply
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div class="bg-muted/30 space-y-4 p-6">
                      <div class="flex items-center justify-between">
                        <span class="text-lg font-bold">Order Total</span>
                        <span class="text-primary text-3xl font-bold">
                          $2,090
                        </span>
                      </div>
                      <Button class="w-full gap-2" size="lg">
                        <LockIcon class="h-5 w-5" />
                        Proceed to Checkout
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter class="bg-green-50">
                    <div class="flex items-start gap-3">
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <TruckIcon class="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p class="font-semibold text-green-900">
                          Free Shipping Applied
                        </p>
                        <p class="mt-1 text-sm text-green-700">
                          Estimated delivery: 3-5 business days
                        </p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
