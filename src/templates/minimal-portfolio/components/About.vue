<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from '@lucide/vue'
import GithubLogo from '@/templates/minimal-portfolio/components/GithubLogo.vue'
import ProfileImage from '@/templates/minimal-portfolio/components/ProfileImage.vue'
</script>

<template>
  <section id="about" class="relative py-20 px-6">
    <div class="max-w-screen-md mx-auto">
      <div class="flex flex-col md:flex-row-reverse gap-12">
        <ProfileImage class="hidden md:block" />

        <!-- Content -->
        <div class="flex-1 md:text-left">
          <Badge variant="secondary" class="mb-4">
            About Me
          </Badge>
          <ProfileImage class="mt-3 mb-8 block md:hidden" />
          <h2 class="text-4xl font-bold mb-4 tracking-tight">
            Passionate about creating impactful web experiences
          </h2>
          <p class="text-muted-foreground mb-6 text-justify">
            With over 5 years of experience in full-stack development, I
            specialize in building scalable web applications using modern
            technologies. My expertise includes React, Node.js, and cloud
            architecture. I'm passionate about creating elegant solutions
            to complex problems and sharing knowledge with the developer
            community.
          </p>
          <div class="flex flex-wrap gap-4 justify-start">
            <Button class="rounded-full">
              <GithubLogo />
              View Github
            </Button>
            <Button variant="outline" class="rounded-full">
              <Download />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
