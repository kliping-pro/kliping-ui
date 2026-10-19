<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import ExperienceItem from '@/templates/minimal-portfolio/components/ExperienceItem.vue'

const experiences = [ { title: "Senior Full Stack Developer", company: "TechCorp Solutions", period: "2021 - Present", description: "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.", technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"], }, { title: "Full Stack Developer", company: "Digital Innovations Inc", period: "2019 - 2021", description: "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.", technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"], }, { title: "Frontend Developer", company: "WebTech Studios", period: "2018 - 2019", description: "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.", technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"], }, ]
</script>

<template>
  <section id="experience" class="relative py-20 px-6">
    <div class="max-w-screen-md mx-auto">
      <div class="text-center mb-12">
        <Badge variant="secondary" class="mb-4">
          Experience
        </Badge>
        <h2 class="text-4xl sm:text-5xl font-bold tracking-tight">
          Professional Journey
        </h2>
        <p class="text-muted-foreground mt-2 sm:mt-4 text-lg">
          A timeline of my professional growth and key achievements
        </p>
      </div>

      <div class="relative">
        <ExperienceItem v-for="(experience, index) in experiences" :key="index" v-bind="experience" />
      </div>
    </div>
  </section>
</template>
