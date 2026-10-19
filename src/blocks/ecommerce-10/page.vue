<script lang="ts">
export const description = "Detail pesanan dengan info produk, alamat, timeline status vertikal, dan ringkasan biaya."
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArchiveIcon,
  CircleCheckBigIcon,
  ClockIcon,
  FileTextIcon,
  HouseIcon,
  MailIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  TruckIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const OPTIONS = [
  { title: "Subtotal", value: "$1,780.00" },
  { title: "Shipping estimate", value: "$0" },
  { title: "Tax estimate", value: "$5" },
]

const isVertical = ref(false)

function handleResize() {
  isVertical.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
})
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div class="mb-3 flex items-center gap-3">
            <h2 class="text-3xl font-bold">Order #1234</h2>
            <Badge class="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              In Transit
            </Badge>
          </div>
          <div class="flex items-center gap-4 text-sm">
            <div class="text-muted-foreground flex items-center gap-2">
              <ClockIcon class="h-4 w-4" />
              <span>
                Placed on <span class="font-semibold">April 1, 2024</span>
              </span>
            </div>
            <div class="text-muted-foreground flex items-center gap-2">
              <PackageIcon class="h-4 w-4" />
              <span class="font-semibold">1 item</span>
            </div>
          </div>
        </div>
        <Button class="gap-2">
          <FileTextIcon class="h-4 w-4" />
          View Invoice
        </Button>
      </div>

      <Card class="shadow-lg">
        <CardHeader class="grid w-full grid-cols-1 gap-8 border-b p-6 md:grid-cols-2">
          <div class="flex gap-4">
            <div class="bg-muted/30 relative h-32 w-32 overflow-hidden rounded-xl border p-2 md:h-40 md:w-40">
              <img
                src="/samples/products/product-03.svg"
                alt="Premium Suit"
                class="h-full w-full object-contain"
              >
            </div>
            <div class="flex flex-1 flex-col justify-between">
              <div class="space-y-2">
                <h3 class="text-lg font-semibold">Premium Suit</h3>
                <p class="text-2xl font-bold">$790</p>
                <p class="text-muted-foreground text-sm leading-relaxed">
                  The time is now for it to be okay to be great. People in
                  this world shun people for being great.
                </p>
              </div>
              <div class="mt-3 flex items-center gap-2">
                <Badge variant="outline">Size: M</Badge>
                <Badge variant="outline">Qty: 1</Badge>
              </div>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                  <MapPinIcon class="text-primary h-4 w-4" />
                </div>
                <p class="font-semibold">Delivery Address</p>
              </div>
              <p class="text-muted-foreground text-sm leading-relaxed">
                362 Ridgewood Avenue
                <br>
                Alaska 99669, USA
              </p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                  <MailIcon class="text-primary h-4 w-4" />
                </div>
                <p class="font-semibold">Shipping Updates</p>
              </div>
              <div class="space-y-1 text-sm">
                <p class="text-muted-foreground flex items-center gap-1.5">
                  <MailIcon class="h-3.5 w-3.5" />
                  michael@email.com
                </p>
                <p class="text-muted-foreground flex items-center gap-1.5">
                  <PhoneIcon class="h-3.5 w-3.5" />
                  (307) 682-8835
                </p>
              </div>
              <Button variant="outline" size="sm" class="mt-2">
                Edit Contact
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent class="w-full p-6 sm:p-8">
          <div class="flex flex-col gap-8 lg:flex-row">
            <div class="flex-1">
              <h3 class="mb-6 text-lg font-semibold">Order Timeline</h3>
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="bg-primary flex h-10 w-10 items-center justify-center rounded-full shadow-md">
                      <HouseIcon class="h-5 w-5 text-white" />
                    </div>
                    <div class="bg-primary my-2 w-0.5 flex-1" />
                  </div>
                  <div class="pb-6">
                    <div class="mb-1 flex items-center gap-2">
                      <p class="font-semibold">Order Placed</p>
                      <Badge
                        variant="outline"
                        class="border-green-500/30 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      >
                        Complete
                      </Badge>
                    </div>
                    <p class="text-muted-foreground text-sm">
                      Your order was placed on April 1, 2024
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="bg-primary flex h-10 w-10 items-center justify-center rounded-full shadow-md">
                      <CircleCheckBigIcon class="h-5 w-5 text-white" />
                    </div>
                    <div class="bg-primary my-2 w-0.5 flex-1" />
                  </div>
                  <div class="pb-6">
                    <div class="mb-1 flex items-center gap-2">
                      <p class="font-semibold">Order Confirmed</p>
                      <Badge
                        variant="outline"
                        class="border-green-500/30 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      >
                        Complete
                      </Badge>
                    </div>
                    <p class="text-muted-foreground text-sm">
                      Your order has been confirmed on April 2, 2024
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="bg-primary flex h-10 w-10 items-center justify-center rounded-full shadow-md">
                      <ArchiveIcon class="h-5 w-5 text-white" />
                    </div>
                    <div class="bg-border my-2 w-0.5 flex-1" />
                  </div>
                  <div class="pb-6">
                    <div class="mb-1 flex items-center gap-2">
                      <p class="font-semibold">Order Shipped</p>
                      <Badge
                        variant="outline"
                        class="border-blue-500/30 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                      >
                        In Progress
                      </Badge>
                    </div>
                    <p class="text-muted-foreground text-sm">
                      Your order has been shipped on April 3, 2024
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="bg-muted flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed">
                      <TruckIcon class="text-muted-foreground h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 flex items-center gap-2">
                      <p class="text-muted-foreground font-semibold">
                        Order Delivered
                      </p>
                      <Badge
                        variant="outline"
                        class="text-muted-foreground"
                      >
                        Pending
                      </Badge>
                    </div>
                    <p class="text-muted-foreground text-sm">
                      Expected delivery on April 6, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator class="lg:hidden" />

            <div class="w-full lg:w-80">
              <div class="bg-muted/30 rounded-xl border p-6">
                <h3 class="mb-4 text-lg font-semibold">Order Summary</h3>
                <div class="space-y-3">
                  <div v-for="{ title, value } in OPTIONS" :key="title" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">{{ title }}</span>
                    <span class="font-medium">{{ value }}</span>
                  </div>
                </div>
                <Separator class="my-4" />
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold">Order Total</span>
                  <span class="text-2xl font-bold">$1,785.00</span>
                </div>

                <div class="bg-primary/10 mt-6 flex items-start gap-2 rounded-lg p-4">
                  <TruckIcon class="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <div class="space-y-1">
                    <p class="text-sm font-medium">Track Your Order</p>
                    <p class="text-muted-foreground text-xs">
                      Estimated delivery: April 6, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
