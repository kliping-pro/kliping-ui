<script setup lang="ts">
import type { HoverCardContentProps, HoverCardRootProps } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { RelativeTimeTriggerVariants } from '.'
import { Primitive } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'
import { relativeTimeTriggerVariants } from '.'
import TimezoneCard from './TimezoneCard.vue'
import { formatRelativeTime, getBrowserLocale } from './time'

/**
 * Waktu relatif yang membuka kartu berisi waktu persisnya.
 *
 * "3 jam lalu" enak dibaca sekilas tapi kehilangan seluruh ketepatannya —
 * dan kalau pembacanya di zona waktu lain, tidak ada cara menerjemahkannya
 * kembali. Kartunya mengembalikan yang hilang itu: tanggal penuh, jam
 * persisnya, dan zona-zona lain yang diminta.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The moment to display: a Date, an ISO/date string, or a timestamp in ms. */
  date: Date | string | number
  variant?: RelativeTimeTriggerVariants['variant']
  /** Extra time zones to show. The device's zone is always added below. */
  timezones?: string[]
  /** How often the relative text refreshes, in milliseconds. */
  updateInterval?: number
  defaultOpen?: HoverCardRootProps['defaultOpen']
  /** Delay in ms before the card opens on hover. */
  openDelay?: HoverCardRootProps['openDelay']
  /** Delay in ms before the card closes after the pointer leaves. */
  closeDelay?: HoverCardRootProps['closeDelay']
  /** Preferred side of the trigger to place the card on. */
  side?: HoverCardContentProps['side']
  /** Alignment of the card against the trigger. */
  align?: HoverCardContentProps['align']
  /** Distance in px between the trigger and the card. */
  sideOffset?: HoverCardContentProps['sideOffset']
  /** Offset in px from the aligned edge of the card. */
  alignOffset?: HoverCardContentProps['alignOffset']
  /** Flips or shifts the card to keep it inside the viewport. */
  avoidCollisions?: HoverCardContentProps['avoidCollisions']
  /** Distance in px from the viewport edges used for collision detection. */
  collisionPadding?: HoverCardContentProps['collisionPadding']
  class?: HTMLAttributes['class']
}>(), {
  as: 'button',
  timezones: () => ['UTC'],
  updateInterval: 1000,
  openDelay: 500,
  closeDelay: 300,
})

const open = defineModel<boolean | undefined>('open', { default: undefined })

const parsedDate = computed(() => (props.date instanceof Date ? props.date : new Date(props.date)))

const locale = getBrowserLocale()

/**
 * Teks relatifnya baru dihitung setelah terpasang.
 *
 * Render server dan render klien terjadi pada detik yang berbeda, dan
 * "3 detik lalu" versus "5 detik lalu" cukup untuk membuat hidrasi mengeluh.
 * Yang digambar server tanggalnya saja — tepat, dan sama di kedua sisi.
 */
const relative = ref('')
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  relative.value = formatRelativeTime(parsedDate.value, locale)
  timer = setInterval(() => {
    relative.value = formatRelativeTime(parsedDate.value, locale)
  }, props.updateInterval)
})

onBeforeUnmount(() => clearInterval(timer))

const short = computed(() => new Intl.DateTimeFormat(locale, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(parsedDate.value))

const iso = computed(() => parsedDate.value.toISOString())
</script>

<template>
  <HoverCard
    v-model:open="open"
    :close-delay="props.closeDelay"
    :default-open="props.defaultOpen"
    :open-delay="props.openDelay"
  >
    <HoverCardTrigger as-child>
      <Primitive
        :as="props.as"
        :as-child="props.asChild"
        :class="cn(relativeTimeTriggerVariants({ variant: props.variant }), props.class)"
        data-slot="relative-time-card-trigger"
      >
        <slot>
          <!--
            `data-allow-mismatch="text"` menahan Vue mengeluh soal hidrasi di
            sini, dan itu memang tempatnya. Waktu yang dirapikan
            `Intl.DateTimeFormat` bergantung pada lokal lingkungannya — Node
            saat render server, peramban pembacanya saat hidrasi — dan
            keduanya tidak akan pernah sama untuk semua pembaca.

            Menyembunyikannya sampai terpasang bukan pilihan yang lebih baik:
            yang hilang dari HTML statisnya justru tanggalnya sendiri, satu-
            satunya isi yang berarti dari komponen ini.
          -->
          <time data-allow-mismatch="text" :datetime="iso">{{ short }}</time>
        </slot>
      </Primitive>
    </HoverCardTrigger>

    <HoverCardContent
      :align="props.align"
      :align-offset="props.alignOffset"
      :avoid-collisions="props.avoidCollisions"
      class="flex w-full max-w-[420px] flex-col gap-2 p-3"
      :collision-padding="props.collisionPadding"
      :side="props.side"
      :side-offset="props.sideOffset"
    >
      <time class="text-muted-foreground text-sm" data-allow-mismatch="text" :datetime="iso">{{ relative || short }}</time>
      <div class="flex flex-col gap-1" role="list">
        <TimezoneCard v-for="zone in props.timezones" :key="zone" :date="parsedDate" role="listitem" :timezone="zone" />
        <TimezoneCard :date="parsedDate" role="listitem" />
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
