<script lang="ts">
export const description = "Garis bawah dan judulnya berubah nila saat terbuka."
</script>

<script setup lang="ts">
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
  },
  {
    title: "How long does shipping usually take?",
    content:
      "Domestic shipping typically takes 3-5 business days, while international orders may take up to 2-3 weeks depending on your location and customs processing times.",
  },
  {
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy for most products. Items must be unused and in their original packaging. To initiate a return, simply contact our support with your order details.",
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
    <AccordionItem v-for="({ title, content }, index) in items"
      class="data-[state=open]:border-indigo-600 data-[state=open]:border-b-2 dark:data-[state=open]:border-indigo-500"
      :key="index"
      :value="`item-${index}`"
    >
      <AccordionTrigger class="data-[state=open]:text-indigo-600 dark:data-[state=open]:text-indigo-500">
        {{ title }}
      </AccordionTrigger>
      <AccordionContent>{{ content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
