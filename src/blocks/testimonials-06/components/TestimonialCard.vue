<script setup lang="ts">
/**
 * Kartu satu testimoni: potret di kiri (mulai lg), bintang, kutipan, dan nama.
 *
 * Di sumbernya kartu ini fungsi kecil di bawah berkas yang sama, dan
 * pengangkut otomatis melewatkannya — `page.vue` memanggil `<TestimonialCard>`
 * yang tidak pernah ada, sehingga carousel-nya kosong. Isinya diangkut tangan
 * dari sumber. `<Image fill>` milik Next jadi `<img>` yang menempel penuh ke
 * kotaknya (`absolute inset-0 size-full`), karena itulah arti `fill` di sana.
 */
import { StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

defineProps<{
  testimonial: {
    id: number
    name: string
    designation: string
    company: string
    testimonial: string
    portraitImage: string
  }
}>()
</script>

<template>
  <div class="mb-8 rounded-xl bg-accent px-6 py-8 sm:py-6">
    <div class="flex items-center justify-between gap-20">
      <div class="relative hidden aspect-3/4 w-full max-w-[18rem] shrink-0 lg:block">
        <div class="absolute inset-0 overflow-hidden rounded-xl">
          <img
            loading="lazy"
            :alt="testimonial.name"
            class="absolute inset-0 size-full object-cover"
            sizes="(min-width: 1024px) 18rem, 0px"
            :src="testimonial.portraitImage"
          >
        </div>
        <div class="absolute top-10 right-0 z-10 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-primary">
          <svg
            class="h-6 w-6"
            fill="none"
            height="102"
            role="img"
            viewBox="0 0 102 102"
            width="102"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Quote</title>
            <path
              class="fill-primary-foreground"
              d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
            />
          </svg>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex items-center justify-between gap-1">
          <div class="hidden items-center gap-4 sm:flex md:hidden">
            <Avatar class="h-8 w-8 md:h-10 md:w-10">
              <AvatarFallback class="bg-primary font-medium text-primary-foreground text-xl">
                {{ testimonial.name.charAt(0) }}
              </AvatarFallback>
            </Avatar>
            <div>
              <p class="font-semibold text-lg">{{ testimonial.name }}</p>
              <p class="text-muted-foreground text-sm">
                {{ testimonial.designation }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <StarIcon class="h-5 w-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon class="h-5 w-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon class="h-5 w-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon class="h-5 w-5 fill-muted-foreground stroke-muted-foreground" />
            <StarIcon class="h-5 w-5 fill-muted-foreground stroke-muted-foreground" />
          </div>
        </div>
        <p class="mt-6 font-medium text-lg leading-normal tracking-[-0.015em] sm:text-2xl lg:text-[1.75rem] lg:leading-normal! xl:text-3xl">
          {{ testimonial.testimonial }}
        </p>
        <div class="mt-10 flex items-center gap-4 sm:hidden md:flex">
          <Avatar class="size-10">
            <AvatarFallback class="bg-primary font-medium text-primary-foreground text-xl">
              {{ testimonial.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <p class="font-medium">{{ testimonial.name }}</p>
            <p class="text-muted-foreground text-sm">
              {{ testimonial.designation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
