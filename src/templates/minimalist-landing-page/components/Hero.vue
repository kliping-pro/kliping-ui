<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
    <div class="max-w-(--breakpoint-xl) w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">
      <div class="max-w-xl">
        <Badge class="rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>
        <h1 class="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-semibold leading-[1.2]! tracking-tight">
          Customized UI Blocks & Components
        </h1>
        <p class="mt-6 max-w-[60ch] xs:text-lg">
          Explore a collection of UI blocks and components, ready to
          preview and copy. Streamline your development workflow with
          easy-to-implement examples.
        </p>
        <div class="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Button
            size="lg"
            class="w-full sm:w-auto rounded-full text-base"
          >
            Get Started <ArrowUpRight class="h-5! w-5!" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            class="w-full sm:w-auto rounded-full text-base shadow-none"
          >
            <CirclePlay class="h-5! w-5!" /> Watch Demo
          </Button>
        </div>
      </div>
      <div class="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square">
        <img loading="lazy"
          src="/placeholder.svg"
          fill
          alt=""
          class="object-cover rounded-xl"
        />
      </div>
    </div>
  </div>
</template>
