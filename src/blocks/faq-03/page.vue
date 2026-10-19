<script lang="ts">
export const description = "Judul di kiri, akordeon bertanda tambah di kanan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import { cn } from "@/lib/utils"
import { AccordionHeader, AccordionTrigger } from 'reka-ui'

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
  {
    question: "Can I cancel or change my order?",
    answer:
      "Yes, you can cancel or change your order within 24 hours of placing it. Contact customer support to make updates.",
  },
  {
    question: "Do you offer discounts for bulk purchases?",
    answer:
      "Yes, we provide special discounts for bulk orders. Contact our sales team with your requirements for a customized quote.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 3-7 business days domestically and 7-14 business days internationally, depending on your location and selected shipping method.",
  },
  {
    question: "Are your products eco-friendly?",
    answer:
      "Many of our products are made with sustainable materials and eco-friendly practices to reduce environmental impact while maintaining quality.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Reach out via email at support@example.com or call us at 1-800-123-4567 for assistance with any inquiries.",
  },
]

const value = ref<string>()

</script>

<template>
  <div class="px-6 py-20">
    <div class="mx-auto w-full max-w-(--breakpoint-lg)">
      <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Frequently Asked Questions
      </h2>

      <div class="mt-6 grid w-full gap-x-10 md:grid-cols-2">
        <Accordion
          class="w-full"
          collapsible
          type="single"
          v-model="value"
        >
          <AccordionItem v-for="({ question, answer }, index) in faq.slice(0, 5)" :key="question" :value="`question-${index}`">
            <AccordionHeader class="flex">
              <AccordionTrigger
                :class="cn(
                  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-45',
                  'text-start text-lg'
                )"
              >
                {{ question }}
                <PlusIcon class="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="text-pretty text-base text-muted-foreground">
              {{ answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion
          class="w-full"
          collapsible
          type="single"
          v-model="value"
        >
          <AccordionItem v-for="({ question, answer }, index) in faq.slice(5)" :key="question" :value="`question-${index + 5}`">
            <AccordionHeader class="flex">
              <AccordionTrigger
                :class="cn(
                  'flex flex-1 items-center justify-between py-4 font-medium tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45',
                  'text-start text-lg'
                )"
              >
                {{ question }}
                <PlusIcon class="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="text-pretty text-base text-muted-foreground">
              {{ answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>
