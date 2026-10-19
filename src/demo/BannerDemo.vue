<script setup lang="ts">
import { Info, TriangleAlert } from '@lucide/vue'
import { ref } from 'vue'
import {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@/components/banner'
import { Button } from '@/components/ui/button'

const isOpen = ref(true)
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <!--
      Dipakai sendirian, tanpa `<Banners>` di atasnya: pitanya digambar di
      tempatnya dituliskan. Di dalam `<Banners>`, komponen yang sama ikut
      antrean dan menempel di tepi layar.
    -->
    <Banner v-model:open="isOpen" class="rounded-md border" variant="info">
      <BannerIcon>
        <Info />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>New version available</BannerTitle>
        <BannerDescription>Reload the page to use version 1.4.0.</BannerDescription>
      </BannerContent>
      <BannerActions>
        <Button size="sm" variant="outline">
          Reload
        </Button>
        <BannerClose />
      </BannerActions>
    </Banner>

    <Banner class="rounded-md border" :dismissible="false" variant="warning">
      <BannerIcon>
        <TriangleAlert />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>Scheduled maintenance</BannerTitle>
        <BannerDescription>The service will be briefly unavailable on Saturday, 2:00–4:00 AM UTC.</BannerDescription>
      </BannerContent>
    </Banner>

    <Button v-if="!isOpen" class="w-fit" size="sm" variant="secondary" @click="isOpen = true">
      Show again
    </Button>
  </div>
</template>
