<!-- example: 1. Custom Trigger -->
<script setup lang="ts">
import { ref } from 'vue'
import { Mention, MentionContent, MentionInput, MentionItem } from '@/components/mention'

const users = [
  { id: '1', name: 'Olivia Martin', email: 'olivia@email.com' },
  { id: '2', name: 'Isabella Nguyen', email: 'isabella@email.com' },
  { id: '3', name: 'Emma Wilson', email: 'emma@email.com' },
  { id: '4', name: 'Jackson Lee', email: 'jackson@email.com' },
  { id: '5', name: 'William Kim', email: 'will@email.com' },
]

const text = ref('')
</script>

<template>
  <Mention v-model="text" trigger="#" class="w-full max-w-[400px]">
    <MentionInput placeholder="Type # to mention a user..." :rows="3" />
    <MentionContent>
      <MentionItem
        v-for="user in users"
        :key="user.id"
        :value="user.name"
        class="flex-col items-start gap-0.5"
      >
        <span class="text-sm">{{ user.name }}</span>
        <span class="text-xs text-muted-foreground">{{ user.email }}</span>
      </MentionItem>
    </MentionContent>
  </Mention>
</template>
