<script lang="ts">
export const description = "Agen pembuat video AI dengan progress, preview pemutar, dan daftar video terbuat."
</script>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import {
  ClockIcon,
  DownloadIcon,
  FileVideoCameraIcon,
  Loader2Icon,
  PauseIcon,
  PlayIcon,
  SparklesIcon,
  VideoIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Sample thumbnails served by kliping.pro.
const SAMPLE_THUMBNAILS = ['/samples/photos/photo-03.svg', '/samples/photos/photo-07.svg', '/samples/photos/photo-11.svg', '/samples/photos/photo-15.svg']

const AI_PROVIDERS = [
  { value: "runway", label: "Runway Gen-3" },
  { value: "pika", label: "Pika Labs" },
  { value: "stability", label: "Stability AI Video" },
  { value: "google", label: "Google Veo" },
  { value: "openai", label: "OpenAI Sora" },
]

const VIDEO_DURATIONS = [
  { value: "3", label: "3 seconds" },
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "15", label: "15 seconds" },
]

const VIDEO_STYLES = [
  { value: "realistic", label: "Realistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "animated", label: "Animated" },
  { value: "artistic", label: "Artistic" },
  { value: "abstract", label: "Abstract" },
]

interface GeneratedVideo {
  id: string
  prompt: string
  url: string
  thumbnail: string
  duration: string
  style: string
  timestamp: Date
}

const prompt = ref("")
const provider = ref("runway")
const apiKey = ref("")
const duration = ref("5")
const style = ref("realistic")
const isGenerating = ref(false)
const progress = ref(0)
const generatedVideos = ref<GeneratedVideo[]>([])
const selectedVideo = ref<GeneratedVideo | null>(null)
const isPlaying = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

// Timers are tracked so they can be cleared when the block unmounts.
let unmounted = false
const timeouts = new Set<ReturnType<typeof setTimeout>>()
const intervals = new Set<ReturnType<typeof setInterval>>()
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(() => {
      timeouts.delete(id)
      resolve()
    }, ms)
    timeouts.add(id)
  })
const stopInterval = (id: ReturnType<typeof setInterval>) => {
  clearInterval(id)
  intervals.delete(id)
}

onBeforeUnmount(() => {
  unmounted = true
  timeouts.forEach(clearTimeout)
  timeouts.clear()
  intervals.forEach(clearInterval)
  intervals.clear()
})

const handleGenerate = async () => {
  if (!prompt.value.trim() || !apiKey.value) return

  isGenerating.value = true
  progress.value = 0

  // Simulate video generation progress
  const interval = setInterval(() => {
    if (progress.value >= 100) {
      stopInterval(interval)
      progress.value = 100
      return
    }
    progress.value = progress.value + 5
  }, 300)
  intervals.add(interval)

  // Simulate video generation
  await wait(6000)
  if (unmounted) return
  stopInterval(interval)

  const newVideo: GeneratedVideo = {
    id: Date.now().toString(),
    prompt: prompt.value,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: SAMPLE_THUMBNAILS[Math.floor(Math.random() * SAMPLE_THUMBNAILS.length)],
    duration: duration.value,
    style: style.value,
    timestamp: new Date(),
  }

  generatedVideos.value = [newVideo, ...generatedVideos.value]
  selectedVideo.value = newVideo
  isGenerating.value = false
  progress.value = 0
}

const togglePlayPause = () => {
  if (!videoRef.value) return

  if (isPlaying.value) {
    videoRef.value.pause()
  }
  else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const handleDownload = () => {
  if (!selectedVideo.value) return
  const link = document.createElement("a")
  link.href = selectedVideo.value.url
  link.download = `ai-video-${selectedVideo.value.id}.mp4`
  link.click()
}
</script>

<template>
  <div class="container mx-auto py-8">
    <Card class="mx-auto max-w-7xl">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <VideoIcon class="h-6 w-6" />
          AI Video Generation Agent
        </CardTitle>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <Label for="duration">Duration</Label>
            <Select v-model="duration">
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="d in VIDEO_DURATIONS" :key="d.value" :value="d.value">
                  {{ d.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="style">Style</Label>
            <Select v-model="style">
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="s in VIDEO_STYLES" :key="s.value" :value="s.value">
                  {{ s.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="space-y-4 lg:col-span-2">
            <div class="space-y-2">
              <Label for="prompt">Video Prompt</Label>
              <Textarea
                id="prompt"
                v-model="prompt"
                placeholder="Describe the video you want to generate... (e.g., 'A drone shot flying over a futuristic city at sunset')"
                :rows="4"
                :disabled="!apiKey || isGenerating"
              />
            </div>

            <Button
              :disabled="!prompt.trim() || !apiKey || isGenerating"
              class="w-full"
              size="lg"
              @click="handleGenerate"
            >
              <template v-if="isGenerating">
                <Loader2Icon class="mr-2 h-5 w-5 animate-spin" />
                Generating Video...
              </template>
              <template v-else>
                <SparklesIcon class="mr-2 h-5 w-5" />
                Generate Video
              </template>
            </Button>

            <Card v-if="isGenerating" class="bg-muted/50">
              <CardContent class="pt-6">
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-muted-foreground">
                      Processing video generation...
                    </span>
                    <span class="font-medium">{{ progress }}%</span>
                  </div>
                  <Progress :model-value="progress" class="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card v-if="selectedVideo">
              <CardHeader>
                <div class="flex items-start justify-between">
                  <div class="space-y-1">
                    <CardTitle class="text-lg">Preview</CardTitle>
                    <p class="text-muted-foreground text-sm">
                      {{ selectedVideo.prompt }}
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <Badge variant="secondary">
                      <ClockIcon class="mr-1 h-3 w-3" />
                      {{ selectedVideo.duration }}s
                    </Badge>
                    <Badge variant="secondary" class="capitalize">
                      {{ selectedVideo.style }}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <video
                    ref="videoRef"
                    :src="selectedVideo.url"
                    class="h-full w-full"
                    @play="isPlaying = true"
                    @pause="isPlaying = false"
                  />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      class="h-16 w-16 rounded-full"
                      @click="togglePlayPause"
                    >
                      <PauseIcon v-if="isPlaying" class="h-6 w-6" />
                      <PlayIcon v-else class="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Button class="flex-1" @click="handleDownload">
                    <DownloadIcon class="mr-2 h-4 w-4" />
                    Download Video
                  </Button>
                  <Button
                    variant="outline"
                    :disabled="isGenerating"
                    class="flex-1"
                    @click="handleGenerate"
                  >
                    <SparklesIcon class="mr-2 h-4 w-4" />
                    Generate New
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card v-if="!apiKey" class="bg-muted/50">
              <CardContent class="flex flex-col items-center justify-center py-12">
                <FileVideoCameraIcon class="text-muted-foreground mb-4 h-12 w-12" />
                <p class="text-muted-foreground text-center text-sm">
                  Please enter your API key to start generating videos
                </p>
              </CardContent>
            </Card>
          </div>

          <div class="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle class="text-base">Generated Videos</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div v-if="generatedVideos.length === 0" class="text-muted-foreground py-8 text-center text-sm">
                  No videos generated yet
                </div>
                <template v-else>
                  <Card
                    v-for="video in generatedVideos"
                    :key="video.id"
                    :class="`cursor-pointer transition-colors ${
                      selectedVideo?.id === video.id
                        ? 'border-primary'
                        : 'hover:border-primary/50'
                    }`"
                    @click="selectedVideo = video"
                  >
                    <CardContent class="p-3">
                      <div class="relative mb-2 aspect-video overflow-hidden rounded">
                        <img
                          :src="video.thumbnail"
                          :alt="video.prompt"
                          class="h-full w-full object-cover"
                        >
                        <div class="absolute inset-0 flex items-center justify-center bg-black/30">
                          <PlayIcon class="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p class="line-clamp-2 text-xs">{{ video.prompt }}</p>
                      <div class="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" class="text-xs">
                          <ClockIcon class="mr-1 h-3 w-3" />
                          {{ video.duration }}s
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </template>
              </CardContent>
            </Card>

            <Card class="bg-muted/50">
              <CardHeader>
                <CardTitle class="text-sm">Tips</CardTitle>
              </CardHeader>
              <CardContent class="text-muted-foreground space-y-2 text-xs">
                <p>• Be specific and descriptive in your prompts</p>
                <p>• Describe camera movements and angles</p>
                <p>• Mention lighting and atmosphere</p>
                <p>• Specify the mood and style you want</p>
                <p>• Keep prompts under 500 characters</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
