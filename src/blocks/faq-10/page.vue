<script lang="ts">
export const description = "Judul dan ajakan di kiri, akordeon berikon di kanan."
</script>

<script setup lang="ts">
import {
  CircleDollarSign,
  Clock,
  type LucideIcon,
  Package,
  PackageX,
  Plane,
  ShieldPlus,
  Users,
  Waypoints,
} from '@lucide/vue'
import { Accordion } from '@/components/ui/accordion'
import AccordionItemList from '@/blocks/faq-10/components/AccordionItemList.vue'

type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
  icon: LucideIcon;
}

const faqs: FrequentlyAskedQuestion[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all unused products. Please ensure the item is in original packaging when returning.",
    icon: Package,
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3-7 business days depending on your location.",
    icon: Clock,
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping fees and delivery times vary by destination.",
    icon: Plane,
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you'll receive an email with a tracking link. You can also track your order in your account dashboard.",
    icon: Waypoints,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, UPI, and net banking.",
    icon: CircleDollarSign,
  },
  {
    question: "Can I cancel or change my order?",
    answer:
      "Yes, you can cancel or modify your order within 2 hours of placing it. After that, the order may already be processed for shipment.",
    icon: PackageX,
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we use industry-standard encryption to ensure your personal and payment information is secure.",
    icon: ShieldPlus,
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Absolutely. Our support team is available 24/7 via email and chat to help with any issues or questions.",
    icon: Users,
  },
]

const totalFaqs = faqs.length

const firstHalfFaqs = faqs.slice(0, Math.ceil(totalFaqs / 2))

const secondHalfFaqs = faqs.slice(Math.ceil(totalFaqs / 2))
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-20">
    <h2 class="text-balance text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Frequently Asked Questions
    </h2>
    <p class="mt-3 text-balance text-center text-lg text-muted-foreground md:text-2xl md:tracking-[-0.015em]">
      Find answers to common questions about our products and services
    </p>

    <div class="mx-auto mt-12 max-w-5xl sm:mt-16">
      <Accordion
        class="grid grid-cols-1 gap-4 md:grid-cols-2"
        collapsible
        type="single"
      >
        <div class="space-y-4">
          <AccordionItemList :faqs="firstHalfFaqs" />
        </div>
        <div class="space-y-4">
          <AccordionItemList :faqs="secondHalfFaqs" />
        </div>
      </Accordion>
    </div>
  </div>
</template>
