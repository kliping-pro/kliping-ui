<script setup lang="ts">
import { ref } from 'vue'
import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
  MentionLabel,
} from '@/components/mention'

const people = ['olivia', 'liam', 'emma', 'noah', 'ava']

const text = ref('Hi ')
const lastMentioned = ref<string | null>(null)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-2">
    <Mention v-model="text" trigger="@" @select="v => lastMentioned = v">
      <MentionLabel>Comment</MentionLabel>
      <MentionInput placeholder="Type @ to mention someone…" :rows="4" />
      <MentionContent>
        <MentionItem v-for="person in people" :key="person" :value="person">
          @{{ person }}
        </MentionItem>
      </MentionContent>
    </Mention>

    <p v-if="lastMentioned" class="text-muted-foreground text-sm">
      Last mentioned: <strong>@{{ lastMentioned }}</strong>
    </p>
  </div>
</template>
