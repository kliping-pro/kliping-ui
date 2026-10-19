<script lang="ts">
export const description = "Chat AI dengan pilihan provider, API key, respons streaming, dan proses berpikir."
</script>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { BrainIcon, Loader2Icon, SendIcon } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AI_PROVIDERS = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google Gemini" },
  { value: "cohere", label: "Cohere" },
  { value: "mistral", label: "Mistral AI" },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  thinking?: string
  isStreaming?: boolean
}

const messages = ref<Message[]>([
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI assistant with streaming and thinking capabilities. How can I help you today?",
  },
])
const input = ref("")
const isLoading = ref(false)
const provider = ref("openai")
const apiKey = ref("")
const showThinking = ref(false)
const scrollAreaRef = ref<{ $el: HTMLElement } | null>(null)

// Timers are tracked so they can be cleared when the block unmounts.
let unmounted = false
const timers = new Set<ReturnType<typeof setTimeout>>()
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      timers.delete(id)
      resolve()
    }, ms)
    timers.add(id)
  })

onBeforeUnmount(() => {
  unmounted = true
  timers.forEach(clearTimeout)
  timers.clear()
})

let idCounter = 0
const newId = () => `${Date.now()}-${idCounter++}`

const simulateStreaming = async (text: string) => {
  const words = text.split(" ")
  let currentText = ""

  const messageId = newId()
  messages.value = [
    ...messages.value,
    {
      id: messageId,
      role: "assistant",
      content: "",
      thinking: showThinking.value
        ? "Analyzing your question and formulating a comprehensive response..."
        : undefined,
      isStreaming: true,
    },
  ]

  for (let i = 0; i < words.length; i++) {
    currentText += (i > 0 ? " " : "") + words[i]
    await wait(50)
    if (unmounted) return

    messages.value = messages.value.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            content: currentText,
            isStreaming: i < words.length - 1,
          }
        : msg,
    )
  }
}

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return

  const userMessage: Message = {
    id: newId(),
    role: "user",
    content: input.value.trim(),
  }

  messages.value = [...messages.value, userMessage]
  input.value = ""
  isLoading.value = true

  // Simulate AI response
  const responses = [
    "That's an interesting question. Based on the AI provider you've selected, I can process this with advanced natural language understanding. Let me break this down for you with a detailed analysis.",
    "I understand what you're asking. Using the configured API, I can provide you with accurate information. The key aspects to consider are context, relevance, and accuracy in the response.",
    "Great question! With streaming enabled, you can see my response in real-time as I process your query. This creates a more interactive and engaging experience for users.",
  ]

  const randomResponse
    = responses[Math.floor(Math.random() * responses.length)]!
  await simulateStreaming(randomResponse)
  if (unmounted) return
  isLoading.value = false
}

watch(messages, async () => {
  await nextTick()
  const viewport = scrollAreaRef.value?.$el?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')
  if (viewport) {
    viewport.scrollTop = viewport.scrollHeight
  }
})
</script>

<template>
  <div class="container mx-auto py-8">
    <Card class="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <BrainIcon class="h-6 w-6" />
          AI Chat with Streaming and Thinking
        </CardTitle>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <Label for="provider">AI Provider</Label>
            <Select v-model="provider">
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="p in AI_PROVIDERS" :key="p.value" :value="p.value">
                  {{ p.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="apiKey">API Key</Label>
            <Input
              id="apiKey"
              v-model="apiKey"
              type="password"
              placeholder="Enter your API key"
            />
          </div>
        </div>
        <div class="mt-2 flex items-center gap-2">
          <input
            id="showThinking"
            v-model="showThinking"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300"
          >
          <Label for="showThinking" class="cursor-pointer text-sm">
            Show AI thinking process
          </Label>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <ScrollArea
          ref="scrollAreaRef"
          class="h-[400px] rounded-md border p-4"
        >
          <div class="space-y-4">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`"
            >
              <Avatar v-if="message.role === 'assistant'" class="h-8 w-8">
                <AvatarFallback class="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div
                :class="`max-w-[80%] space-y-2 ${
                  message.role === 'user' ? 'order-first' : ''
                }`"
              >
                <div v-if="message.thinking" class="bg-muted/50 mb-2 rounded-lg border border-dashed p-3">
                  <p class="text-muted-foreground flex items-center gap-2 text-sm">
                    <BrainIcon class="h-4 w-4" />
                    <span class="italic">{{ message.thinking }}</span>
                  </p>
                </div>
                <div
                  :class="`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`"
                >
                  <p class="text-sm">
                    {{ message.content }}
                    <span v-if="message.isStreaming" class="ml-1 inline-block h-4 w-1 animate-pulse bg-current" />
                  </p>
                </div>
              </div>
              <Avatar v-if="message.role === 'user'" class="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div
              v-if="isLoading && messages[messages.length - 1]?.role !== 'assistant'"
              class="flex gap-3"
            >
              <Avatar class="h-8 w-8">
                <AvatarFallback class="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div class="bg-muted flex items-center gap-2 rounded-lg p-3">
                <Loader2Icon class="h-4 w-4 animate-spin" />
                <span class="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        </ScrollArea>
        <form
          class="flex gap-2"
          @submit.prevent="handleSend"
        >
          <Input
            v-model="input"
            placeholder="Type your message..."
            :disabled="isLoading || !apiKey"
          />
          <Button
            type="submit"
            aria-label="Send message"

            :disabled="isLoading || !apiKey || !input.trim()"
          >
            <SendIcon class="h-4 w-4" />
          </Button>
        </form>
        <p v-if="!apiKey" class="text-muted-foreground text-center text-sm">
          Please enter your API key to start chatting
        </p>
      </CardContent>
    </Card>
  </div>
</template>
