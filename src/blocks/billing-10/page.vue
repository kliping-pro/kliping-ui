<script lang="ts">
export const description = "Galeri kartu pembayaran tersimpan berbentuk kartu kredit bergradasi token tema, bisa dibalik untuk melihat CVC, dengan aksi jadikan default dan hapus."
</script>

<script setup lang="ts">
import { computed, markRaw, ref } from 'vue'
import {
  CreditCardIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  StarIcon,
  Trash2Icon,
} from '@lucide/vue'
import { IconBrandMastercard, IconBrandVisa } from '@tabler/icons-vue'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { PaymentCardData } from '@/blocks/billing-10/components/PaymentCard.vue'
import PaymentCard from '@/blocks/billing-10/components/PaymentCard.vue'

// Ikon disimpan apa adanya (markRaw) supaya Vue tidak menjadikannya reaktif.
const visa = markRaw(IconBrandVisa)
const mastercard = markRaw(IconBrandMastercard)
const generic = markRaw(CreditCardIcon)

const cards = ref<PaymentCardData[]>([
  { id: "pm_1", brand: "Visa", brandIcon: visa, last4: "4242", holder: "Nadia Putri", expiry: "04/28", cvc: "318", tone: "primary" },
  { id: "pm_2", brand: "Mastercard", brandIcon: mastercard, last4: "8210", holder: "Nadia Putri", expiry: "11/27", cvc: "604", tone: "ink" },
  { id: "pm_3", brand: "Corporate", brandIcon: generic, last4: "1005", holder: "Rasa Studio Ltd.", expiry: "02/29", cvc: "7731", tone: "soft" },
])

const defaultId = ref("pm_1")
const flipped = ref<string[]>([])
const pendingRemoval = ref<PaymentCardData | null>(null)

const confirmOpen = computed({
  get: () => pendingRemoval.value !== null,
  set: (value: boolean) => {
    if (!value)
      pendingRemoval.value = null
  },
})

const isFlipped = (id: string) => flipped.value.includes(id)

function toggleFlip(id: string) {
  flipped.value = isFlipped(id)
    ? flipped.value.filter(f => f !== id)
    : [...flipped.value, id]
}

function remove() {
  const card = pendingRemoval.value
  if (!card)
    return
  cards.value = cards.value.filter(c => c.id !== card.id)
  if (defaultId.value === card.id && cards.value[0])
    defaultId.value = cards.value[0].id
  pendingRemoval.value = null
}

// Kartu default selalu tampil paling depan.
const ordered = computed(() =>
  [...cards.value].sort((a, b) => Number(b.id === defaultId.value) - Number(a.id === defaultId.value)),
)
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-tight">Saved cards</h2>
        <p class="text-muted-foreground text-sm">
          Tap a card to reveal its security code. The default card is charged first.
        </p>
      </div>
      <Button class="w-full sm:w-auto">
        <PlusIcon />
        Add card
      </Button>
    </div>

    <TransitionGroup
      tag="div"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      move-class="transition-transform duration-300"
    >
      <div v-for="card in ordered" :key="card.id" class="space-y-3">
        <!-- Kartu bisa diketuk untuk dibalik — jalan pintas untuk pointer saja.
             Tombol "Show security code" di bawahnya melakukan hal yang sama,
             jadi yang ini disembunyikan dari pembaca layar dan urutan Tab:
             tanpa itu kontrol yang sama dibacakan dua kali, dengan nama yang
             tidak sama dengan teks kartunya. -->
        <button
          type="button"
          tabindex="-1"
          aria-hidden="true"
          class="block w-full rounded-xl text-left outline-none"
          @click="toggleFlip(card.id)"
        >
          <PaymentCard :card="card" :flipped="isFlipped(card.id)" />
        </button>

        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <div class="flex items-center gap-2 text-sm font-medium">
              <span class="truncate">{{ card.brand }} •••• {{ card.last4 }}</span>
              <Badge v-if="card.id === defaultId" variant="secondary" class="shrink-0">
                Default
              </Badge>
            </div>
            <p class="text-muted-foreground text-xs">Expires {{ card.expiry }}</p>
          </div>
          <div class="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="size-8"
              :aria-label="isFlipped(card.id) ? 'Hide security code' : 'Show security code'"
              @click="toggleFlip(card.id)"
            >
              <EyeOffIcon v-if="isFlipped(card.id)" />
              <EyeIcon v-else />
            </Button>
            <Button
              v-if="card.id !== defaultId"
              variant="ghost"
              size="icon"
              class="size-8"
              aria-label="Set as default"
              @click="defaultId = card.id"
            >
              <StarIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive hover:text-destructive size-8"
              :disabled="cards.length === 1"
              aria-label="Remove card"
              @click="pendingRemoval = card"
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <AlertDialog v-model:open="confirmOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this card?</AlertDialogTitle>
          <AlertDialogDescription>
            {{ pendingRemoval?.brand }} ending in {{ pendingRemoval?.last4 }} will no longer be
            available for payments.
            <template v-if="pendingRemoval?.id === defaultId">
              Your next card becomes the default.
            </template>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep card</AlertDialogCancel>
          <AlertDialogAction
            :class="buttonVariants({ variant: 'destructive' })"
            @click="remove"
          >
            Remove card
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
