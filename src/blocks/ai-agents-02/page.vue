<script lang="ts">
export const description = "Generator gambar AI dengan tab Generate dan editor brightness, contrast, saturation."
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import {
  DownloadIcon,
  ImageIcon,
  Loader2Icon,
  RotateCwIcon,
  UploadIcon,
  Wand2Icon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

// Sample images served by kliping.pro.
const SAMPLE_IMAGES = ['/samples/photos/photo-02.svg', '/samples/photos/photo-06.svg', '/samples/photos/photo-10.svg', '/samples/photos/photo-14.svg']

const AI_PROVIDERS = [
  { value: "openai", label: "OpenAI DALL-E" },
  { value: "stability", label: "Stability AI" },
  { value: "midjourney", label: "Midjourney" },
  { value: "google", label: "Google Imagen" },
  { value: "anthropic", label: "Anthropic" },
]

const IMAGE_SIZES = [
  { value: "1024x1024", label: "Square (1024x1024)" },
  { value: "1024x1792", label: "Portrait (1024x1792)" },
  { value: "1792x1024", label: "Landscape (1792x1024)" },
]

const prompt = ref("")
const provider = ref("openai")
const apiKey = ref("")
const imageSize = ref("1024x1024")
const isGenerating = ref(false)
const uploadedImage = ref<string | null>(null)
const generatedImage = ref<string | null>(null)
const brightness = ref([100])
const contrast = ref([100])
const saturation = ref([100])
const fileInputRef = ref<{ $el: HTMLInputElement } | null>(null)

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

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (unmounted) return
      uploadedImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleGenerate = async () => {
  if (!prompt.value.trim() || !apiKey.value) return

  isGenerating.value = true

  // Simulate image generation
  await wait(3000)
  if (unmounted) return

  // Sample image served by kliping.pro
  generatedImage.value = SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)]

  isGenerating.value = false
}

const handleDownload = () => {
  if (!generatedImage.value) return
  const link = document.createElement("a")
  link.href = generatedImage.value
  link.download = "ai-generated-image.png"
  link.click()
}

const resetEditor = () => {
  brightness.value = [100]
  contrast.value = [100]
  saturation.value = [100]
}

const imageStyle = computed(() => ({
  filter: `brightness(${brightness.value[0]}%) contrast(${contrast.value[0]}%) saturate(${saturation.value[0]}%)`,
}))
</script>

<template>
  <div class="container mx-auto py-8">
    <Card class="mx-auto max-w-6xl">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <ImageIcon class="h-6 w-6" />
          AI Image Generator with Editor
        </CardTitle>
        <div class="mt-4 grid gap-4 sm:grid-cols-3">
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
          <div class="space-y-2">
            <Label for="size">Image Size</Label>
            <Select v-model="imageSize">
              <SelectTrigger id="size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="size in IMAGE_SIZES" :key="size.value" :value="size.value">
                  {{ size.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs default-value="generate" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="edit">Edit & Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" class="space-y-4">
            <div class="space-y-2">
              <Label for="prompt">Image Prompt</Label>
              <Textarea
                id="prompt"
                v-model="prompt"
                placeholder="Describe the image you want to generate... (e.g., 'A serene landscape with mountains at sunset')"
                :rows="4"
                :disabled="!apiKey"
              />
            </div>

            <Button
              :disabled="!prompt.trim() || !apiKey || isGenerating"
              class="w-full"
              @click="handleGenerate"
            >
              <template v-if="isGenerating">
                <Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </template>
              <template v-else>
                <Wand2Icon class="mr-2 h-4 w-4" />
                Generate Image
              </template>
            </Button>

            <div v-if="generatedImage" class="space-y-4">
              <div class="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
                <img
                  :src="generatedImage"
                  alt="Generated"
                  class="h-full w-full object-contain"
                >
              </div>
              <div class="flex gap-2">
                <Button class="flex-1" @click="handleDownload">
                  <DownloadIcon class="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  :disabled="isGenerating"
                  @click="handleGenerate"
                >
                  <RotateCwIcon class="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </div>

            <p v-if="!apiKey" class="text-muted-foreground text-center text-sm">
              Please enter your API key to start generating images
            </p>
          </TabsContent>

          <TabsContent value="edit" class="space-y-4">
            <div class="space-y-4">
              <div class="space-y-2">
                <Label>Upload Image</Label>
                <div class="flex gap-2">
                  <Input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    class="flex-1"
                    @change="handleFileUpload"
                  />
                  <Button
                    variant="outline"
                    @click="fileInputRef?.$el?.click()"
                  >
                    <UploadIcon class="mr-2 h-4 w-4" />
                    Browse
                  </Button>
                </div>
              </div>

              <div v-if="uploadedImage || generatedImage" class="space-y-4">
                <div class="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
                  <img
                    :src="uploadedImage || generatedImage || ''"
                    alt="Editing"
                    class="h-full w-full object-contain"
                    :style="imageStyle"
                  >
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle class="text-sm">Image Editor</CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-6">
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <Label>Brightness</Label>
                        <span class="text-muted-foreground text-sm">
                          {{ brightness[0] }}%
                        </span>
                      </div>
                      <Slider
                        v-model="brightness"
                        :min="0"
                        :max="200"
                        :step="1"
                      />
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <Label>Contrast</Label>
                        <span class="text-muted-foreground text-sm">
                          {{ contrast[0] }}%
                        </span>
                      </div>
                      <Slider
                        v-model="contrast"
                        :min="0"
                        :max="200"
                        :step="1"
                      />
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <Label>Saturation</Label>
                        <span class="text-muted-foreground text-sm">
                          {{ saturation[0] }}%
                        </span>
                      </div>
                      <Slider
                        v-model="saturation"
                        :min="0"
                        :max="200"
                        :step="1"
                      />
                    </div>

                    <div class="flex gap-2">
                      <Button
                        variant="outline"
                        class="flex-1"
                        @click="resetEditor"
                      >
                        Reset
                      </Button>
                      <Button class="flex-1" @click="handleDownload">
                        <DownloadIcon class="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div v-if="!uploadedImage && !generatedImage" class="border-muted-foreground/25 bg-muted/50 flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <ImageIcon class="text-muted-foreground mb-4 h-12 w-12" />
                <p class="text-muted-foreground text-sm">
                  Upload an image or generate one to start editing
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>
