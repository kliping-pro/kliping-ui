<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import GithubLogo from '@/templates/minimal-portfolio/components/GithubLogo.vue'
import ProjectCard from '@/templates/minimal-portfolio/components/ProjectCard.vue'

const projects = [ { title: "E-Commerce Platform", description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.", image: "/placeholder.svg", technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"], liveUrl: "https://ecommerce-demo.com", githubUrl: "https://github.com/username/ecommerce", }, { title: "AI Task Manager", description: "Smart task management app that uses AI to categorize, prioritize, and suggest optimal task scheduling.", image: "/placeholder.svg", technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"], liveUrl: "https://ai-taskmanager.com", githubUrl: "https://github.com/username/ai-taskmanager", }, { title: "Real-time Chat Application", description: "Feature-rich chat application with real-time messaging, file sharing, and video calls.", image: "/placeholder.svg", technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Redis"], liveUrl: "https://chatapp-demo.com", githubUrl: "https://github.com/username/chat-app", }, { title: "AI Image Generator", description: "An AI image generator that uses a model to generate images based on a prompt.", image: "/placeholder.svg", technologies: ["React", "Next.js", "Tailwind CSS", "Shadcn UI"], liveUrl: "https://ai-image-generator.com", githubUrl: "https://github.com/username/ai-image-generator", }, ]
</script>

<template>
  <section id="projects" class="relative py-20 px-6">
    <div class="max-w-screen-md mx-auto">
      <div class="text-center mb-12">
        <Badge variant="secondary" class="mb-4">
          Projects
        </Badge>
        <h2 class="text-4xl sm:text-5xl font-bold tracking-tight">
          Featured Work
        </h2>
        <p class="text-muted-foreground mt-2 sm:mt-4 text-lg">
          Showcasing some of my best projects and technical achievements
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard v-for="(project, index) in projects" :key="index" v-bind="project" />
      </div>
    </div>
  </section>
</template>
