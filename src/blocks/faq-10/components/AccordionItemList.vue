<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
  icon: LucideIcon;
}

defineProps<{
  faqs: FrequentlyAskedQuestion[]
}>()
</script>

<template>
  <AccordionItem v-for="(faq, index) in faqs"
    class="rounded-lg border border-primary/20 bg-primary/10 px-5 last:border-b dark:border-primary/30 dark:bg-primary/15"
    :key="index"
    :value="faq.question"
  >
    <AccordionTrigger class="text-lg">
      <div class="flex items-center gap-2 font-medium">
        <component :is="faq.icon" class="mr-2.5 size-5 shrink-0 text-primary/80 dark:text-primary" />
        {{ faq.question }}
      </div>
    </AccordionTrigger>
    <AccordionContent class="pl-10 text-base">
      {{ faq.answer }}
    </AccordionContent>
  </AccordionItem>
</template>
