<script lang="ts">
export const description = "Judul berikon, isinya sejajar di bawah ikonnya."
</script>

<script setup lang="ts">
import { RotateCcw, ShoppingCart, Truck } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const items = [
  {
    title: "Can I change or cancel my order after placing it?",
    content:
      "Yes, you can change or cancel your order within 1 hour of placement by visiting your account page or contacting our support team. After that, orders may already be processed for shipping.",
    icon: ShoppingCart,
  },
  {
    title: "How long does shipping usually take?",
    content:
      "Domestic shipping typically takes 3-5 business days, while international orders may take up to 2-3 weeks depending on your location and customs processing times.",
    icon: Truck,
  },
  {
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy for most products. Items must be unused and in their original packaging. To initiate a return, simply contact our support with your order details.",
    icon: RotateCcw,
  },
]
</script>

<template>
  <Accordion
    class="my-4 w-full max-w-lg"
    collapsible
    defaultValue="item-0"
    type="single"
  >
    <AccordionItem v-for="({ title, content, icon: Icon }, index) in items" :key="index" :value="`item-${index}`">
      <AccordionTrigger>
        <div class="flex items-start gap-3">
          <component :is="Icon" />
          {{ title }}
        </div>
      </AccordionTrigger>
      <AccordionContent class="pl-9">{{ content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
