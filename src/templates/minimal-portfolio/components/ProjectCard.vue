<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from '@lucide/vue'
import GithubLogo from '@/templates/minimal-portfolio/components/GithubLogo.vue'

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const { title, description, image, technologies, liveUrl, githubUrl } = defineProps<ProjectCardProps>()
</script>

<template>
  <div class="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
    <!-- Project Image -->
    <!-- `fill` milik `next/image` di sumbernya; `<img>` biasa butuh posisinya
         ditulis sendiri supaya gambarnya menutup bidang dan berpusat. -->
    <div class="relative h-64 overflow-hidden bg-accent">
      <img loading="lazy"
        :src="image"
        :alt="title"
        class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col p-6">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-muted-foreground mb-4">{{ description }}</p>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-6">
        <Badge v-for="tech in technologies" :key="tech" variant="secondary" class="rounded-full">
          {{ tech }}
        </Badge>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mt-auto">
        <Button v-if="liveUrl" variant="default" class="rounded-full" as-child>
          <a :href="liveUrl" target="_blank" rel="noopener noreferrer">
            <ExternalLink class="mr-1 h-4 w-4" />
            Live Demo
          </a>
        </Button>
        <Button v-if="githubUrl"
          variant="outline"
          class="rounded-full shadow-none"
          as-child
        >
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
            <GithubLogo class="mr-1 h-4 w-4" />
            View Code
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
