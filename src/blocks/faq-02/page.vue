<script lang="ts">
export const description = "Akordeon ringkas dengan judul pendek di atasnya."
</script>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faq = [
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
  },
]
</script>

<template>
  <div class="px-6 py-20">
    <div class="flex flex-col items-start justify-center gap-x-12 gap-y-6 md:flex-row">
      <h2 class="font-medium text-4xl/snug tracking-[-0.04em] lg:text-[2.75rem]/snug">
        Frequently Asked <br /> Questions
      </h2>

      <Accordion class="max-w-xl" defaultValue="question-0" type="single">
        <AccordionItem v-for="({ question, answer }, index) in faq" :key="question" :value="`question-${index}`">
          <AccordionTrigger class="text-left text-lg">
            {{ question }}
          </AccordionTrigger>
          <AccordionContent class="text-base text-muted-foreground">
            {{ answer }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>
