<script lang="ts">
export const description = "Video runway YouTube layar lebar dengan tombol putar dan tiga kartu produk di bawah."
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { PauseIcon, PlayIcon, ShoppingBagIcon, ShuffleIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const PRODUCTS = [
  {
    id: "card-1",
    media: {
      src: "/samples/avatars/avatar-06.svg",
      alt: "Satin Wrap Dress product thumbnail",
    },
    eyebrow: "Maison Aurore",
    title: "Satin Wrap Dress",
    description: "Fluid silhouette with tie waist and soft sheen.",
    price: "$215.00",
  },
  {
    id: "card-2",
    media: {
      src: "/samples/avatars/avatar-07.svg",
      alt: "Structured Blazer product thumbnail",
    },
    eyebrow: "Atelier No. 9",
    title: "Structured Blazer",
    description: "Sharp shoulders, single-breasted, polished finish.",
    price: "$329.00",
  },
  {
    id: "card-3",
    media: {
      src: "/samples/avatars/avatar-08.svg",
      alt: "Chunky Chelsea Boots product thumbnail",
    },
    eyebrow: "Linea Forte",
    title: "Chunky Chelsea Boots",
    description: "Elevated lug sole with elastic side panels.",
    price: "From $180.00",
  },
]

const isPlaying = ref(true)
const playerReady = ref(false)
let player: any = null

onMounted(() => {
  const tag = document.createElement("script")
  tag.src = "https://www.youtube.com/iframe_api"
  const firstScriptTag = document.getElementsByTagName("script")[0]
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
  ;(window as any).onYouTubeIframeAPIReady = () => {
    player = new (window as any).YT.Player("youtube-player", {
      videoId: "YCIuEU2y8XI",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: "YCIuEU2y8XI",
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          playerReady.value = true
        },
      },
    })
  }
})

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})

function togglePlay() {
  if (player && playerReady.value) {
    if (isPlaying.value) {
      player.pauseVideo()
    }
    else {
      player.playVideo()
    }
    isPlaying.value = !isPlaying.value
  }
}
</script>

<template>
  <section class="relative w-full overflow-hidden rounded-xl">
    <div class="relative aspect-[16/9] w-full lg:aspect-[16/9]">
      <div
        id="youtube-player"
        class="absolute inset-0 h-full w-full rounded-xl"
        :style="{
          pointerEvents: 'none',
        }"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <Button
        variant="outline"
        size="icon"
        class="absolute top-4 left-4 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 hover:text-white lg:top-6 lg:left-6"
        :aria-label="isPlaying ? 'Pause video' : 'Play video'"
        @click="togglePlay"
      >
        <PauseIcon v-if="isPlaying" class="h-4 w-4" />
        <PlayIcon v-else class="h-4 w-4" />
      </Button>

      <div class="absolute inset-x-0 bottom-0 space-y-6 p-4 lg:p-8">
        <div class="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="product in PRODUCTS"
            :key="product.id"
            class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-white/95"
          >
            <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                :src="product.media.src"
                :alt="product.media.alt"
                class="h-full w-full object-cover"
              >
            </div>

            <div class="min-w-0 flex-1">
              <p class="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {{ product.eyebrow }}
              </p>
              <h3 class="truncate font-semibold text-gray-900">
                {{ product.title }}
              </h3>
              <p class="font-semibold text-gray-900">{{ product.price }}</p>
            </div>

            <div class="flex flex-shrink-0 items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 text-gray-600 hover:text-gray-900"
                aria-label="Add to bag"
              >
                <ShoppingBagIcon class="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="h-8 w-8 text-gray-600 hover:text-gray-900"
                aria-label="Compare"
              >
                <ShuffleIcon class="h-4 w-4" />

              </Button>
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            class="rounded-full border-white/80 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
