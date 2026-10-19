<script lang="ts">
export const description = "Satu baris foto memanjang dengan keterangan di sampingnya."
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from "@/lib/utils"
import {
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandTwitter,
} from '@tabler/icons-vue'

const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-23.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-24.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-01.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-02.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-03.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-04.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-05.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-06.svg",
    role: "Customer Success Manager",
  },
]

const api = ref<CarouselApi | null>(null)

function setApi(value: CarouselApi | null) {
  api.value = value
}

const count = ref(0)

function setCount(value: typeof count['value']) {
  count.value = value
}

const current = ref(0)

function setCurrent(value: typeof current['value']) {
  current.value = value
}

watch(api, (newApi) => {
    if (!newApi) {
      return
    }

    setCount(newApi.scrollSnapList().length);
    setCurrent(newApi.selectedScrollSnap() + 1);

    newApi.on("select", () => {
      setCurrent(newApi.selectedScrollSnap() + 1);
    });
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-3xl capitalize tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
      Our core team
    </h2>
    <p class="mt-3 text-balance text-center text-lg text-muted-foreground tracking-[-0.01em] md:text-2xl">
      Passionate people building great products
    </p>

    <!-- Panahnya menggantung 3rem di luar carousel. Di layar sempit panahnya
         turun ke baris titik; mulai lg ruang 3rem itu disediakan sendiri,
         karena tepi max-w-7xl baru berjarak ≥3rem dari tepi layar mulai
         ±1328px (+ lebar scrollbar). Mulai 84rem (1344px) sumbernya sudah
         muat, jadi ruang itu dilepas lagi. -->
    <div class="mt-14 lg:px-12 min-[84rem]:px-0">
      <Carousel
        :opts="{
          align: 'start',
        }"
        @init-api="setApi"
      >
        <CarouselContent>
          <CarouselItem v-for="(member, index) in teamMembers"
            class="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            :key="index"
          >
            <div class="border bg-muted py-12">
              <div class="mx-auto aspect-square max-w-40 select-none overflow-hidden rounded-full bg-muted">
                <img :alt="member.name" :src="member.image" />
              </div>
              <p class="mt-6 text-center font-medium text-lg">
                {{ member.name }}
              </p>
              <p class="mt-0.5 text-center text-muted-foreground">
                {{ member.role }}
              </p>
              <div class="mt-5 flex items-center justify-center gap-4">
                <a aria-label="Twitter" href="#" target="_blank">
                  <IconBrandTwitter class="h-5 w-5 text-muted-foreground hover:text-primary" />
                </a>
                <a aria-label="GitHub" href="#" target="_blank">
                  <IconBrandGithub class="h-5 w-5 text-muted-foreground hover:text-primary" />
                </a>
                <a aria-label="Dribbble" href="#" target="_blank">
                  <IconBrandDribbble class="h-5 w-5 text-muted-foreground hover:text-primary" />
                </a>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div class="mt-6 flex items-center justify-center gap-2">
          <CarouselPrevious class="static mr-2 translate-y-0 lg:absolute lg:mr-0 lg:-translate-y-1/2" />
          <div v-for="(_, index) in Array.from({ length: count })"
            :class="cn(
              'h-2 w-2 rounded-full',
              current === index + 1 ? 'bg-primary' : 'bg-primary/20'
            )"
            :key="index"
          />
          <CarouselNext class="static ml-2 translate-y-0 lg:absolute lg:ml-0 lg:-translate-y-1/2" />
        </div>
      </Carousel>
    </div>
  </div>
</template>
