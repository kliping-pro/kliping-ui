<script lang="ts">
export const description = "Grid metode pembayaran kartu Visa/Mastercard dengan label default dan tooltip aksi."
</script>

<script setup lang="ts">
import { CheckIcon, PencilIcon, PlusIcon, Trash2Icon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const methods: {
  type: "visa" | "mastercard"
  number: string
  isDefault?: boolean
}[] = [
  { type: "mastercard", number: "7852", isDefault: true },
  { type: "visa", number: "9831" },
  { type: "visa", number: "8362" },
  { type: "mastercard", number: "0098" },
]

const cardImg = (type: "visa" | "mastercard") =>
  type === "visa"
    ? "/samples/logos/logo-02.svg"
    : "/samples/logos/logo-03.svg"
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h2 class="text-2xl font-bold">Payment Methods</h2>
        <p class="text-muted-foreground mt-1 text-sm">
          Manage your preferred payment methods securely and conveniently.
        </p>
      </div>
      <Button class="w-full sm:w-auto">
        <PlusIcon class="mr-2 h-4 w-4" /> Add New Card
      </Button>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card
        v-for="{ type, number, isDefault } in methods"
        :key="number"
        class="group hover:border-primary/50 relative flex flex-col gap-4 border p-6 transition-all hover:shadow-md"
      >
        <div v-if="isDefault" class="bg-primary absolute -top-px -right-px rounded-tr-lg rounded-bl-lg px-3 py-1">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-white">
            <CheckIcon class="h-3 w-3" />
            Default
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-50 p-2">
            <img
              :src="cardImg(type)"
              :alt="type"
              class="h-full w-auto object-contain"
            >
          </div>

          <div class="flex flex-1 flex-col gap-1">
            <p class="text-base font-bold tracking-wider">
              **** **** **** {{ number }}
            </p>
            <p class="text-muted-foreground text-sm capitalize">
              {{ type }} Card
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button aria-label="Edit card" size="icon" variant="ghost" class="h-9 w-9">
                  <PencilIcon class="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Card</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  aria-label="Remove card"
                  size="icon"
                  variant="ghost"
                  class="text-destructive hover:bg-destructive/10 hover:text-destructive h-9 w-9"

                >
                  <Trash2Icon class="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove Card</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  </div>
</template>
