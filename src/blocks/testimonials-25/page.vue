<script lang="ts">
export const description = "Grid testimoni dua kolom plus satu lebar dengan logo perusahaan grayscale."
</script>

<script setup lang="ts">
import { Card, CardContent, CardFooter } from '@/components/ui/card'
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="mb-16 max-w-lg">
        <h2 class="mb-4 text-3xl font-bold">
          The heartfelt testimonials of our community
        </h2>
        <p class="text-muted-foreground text-lg">
          From life-enhancing gadgets to unparalleled customer support, and
          transformative learning opportunities.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card class="grid bg-white">
          <CardContent class="p-6">
            <blockquote class="text-center text-2xl font-medium md:text-start">
              "The team went above and beyond to ensure my issue was
              resolved quickly and efficiently. Truly outstanding!"
            </blockquote>
          </CardContent>
          <CardFooter class="flex flex-col items-center justify-between gap-4 px-6 pb-6 text-center md:flex-row md:text-start">
            <div>
              <p class="font-semibold">Jessica Devis</p>
              <p class="text-muted-foreground text-sm">
                Full Stack Developer @Netflix
              </p>
            </div>
            <img
              src="/samples/logos/logo-02.svg"
              alt="logo"
              class="h-14 grayscale"
            >
          </CardFooter>
        </Card>
        <Card class="grid bg-white">
          <CardContent class="p-6">
            <blockquote class="text-center text-2xl font-medium md:text-start">
              "It have broadened my horizons and helped me advance my
              career. The community is incredibly supportive."
            </blockquote>
          </CardContent>
          <CardFooter class="mt-auto flex flex-col items-center justify-between gap-4 px-6 pb-6 text-center md:flex-row md:text-start">
            <div>
              <p class="font-semibold">Marcell Glock</p>
              <p class="text-muted-foreground text-sm">
                Graphic Designer, @Coinbase
              </p>
            </div>
            <img
              src="/samples/logos/logo-03.svg"
              alt="logo"
              class="h-14 brightness-75 grayscale"
            >
          </CardFooter>
        </Card>
        <Card class="col-span-full grid bg-white">
          <CardContent class="p-6">
            <blockquote class="text-center text-2xl font-medium">
              "Its intuitive design and powerful features make it
              indispensable. I can't imagine going back to life before
              it!"
            </blockquote>
          </CardContent>
          <CardFooter class="mt-auto flex flex-col items-center justify-center gap-4 px-6 pb-6 text-center">
            <div>
              <p class="font-semibold">Emma Roberts</p>
              <p class="text-muted-foreground text-sm">
                Chief Executive @Spotify
              </p>
            </div>
            <img
              src="/samples/logos/logo-04.svg"
              alt="logo"
              class="h-14 brightness-50 grayscale"
            >
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
</template>
