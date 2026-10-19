<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import LogoCloud from '@/templates/pure-landing/components/LogoCloud.vue'
</script>

<template>
  <div class="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
    <div class="md:mt-6 flex items-center justify-center">
      <div class="text-center max-w-2xl">
        <Badge class="bg-primary rounded-full py-1 border-none">
          v1.0.0 is available now! 🚀
        </Badge>
        <h1 class="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Customized UI Blocks & Components
        </h1>
        <p class="mt-6 max-w-[60ch] xs:text-lg">
          Explore a collection of UI blocks and components, ready to
          preview and copy. Streamline your development workflow with
          easy-to-implement examples.
        </p>
        <div class="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
          <Button
            size="lg"
            class="w-full sm:w-auto rounded-full text-base"
          >
            Get Started <ArrowUpRight class="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="w-full sm:w-auto rounded-full text-base shadow-none"
          >
            <CirclePlay class="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
    <LogoCloud class="mt-24 max-w-3xl mx-auto" />
  </div>
</template>
