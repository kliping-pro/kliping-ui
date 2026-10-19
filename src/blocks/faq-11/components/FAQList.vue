<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

defineProps<{
  faqs: { question: string; answer: string }[]
}>()
</script>

<template>
  <Accordion class="space-y-4" collapsible type="single">
    <AccordionItem v-for="(faq, index) in faqs"
      class="rounded-xl not-last:border-b-0 bg-muted px-5"
      :key="index"
      :value="faq.question"
    >
      <AccordionTrigger class="text-lg">
        <div class="flex items-center gap-2 font-medium">
          {{ faq.question }}
        </div>
      </AccordionTrigger>
      <AccordionContent class="text-base">
        {{ faq.answer }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
