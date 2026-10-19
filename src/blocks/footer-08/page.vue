<script lang="ts">
export const description = "Footer satu baris berisi hak cipta dan empat ikon sosial kecil."
</script>

<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'

const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="flex flex-row flex-wrap items-center !justify-center gap-x-10 gap-y-2 md:!justify-between">
        <p class="text-foreground text-center text-sm font-medium">
          All rights reserved. Copyright &copy; {{ YEAR }} Acme Inc.
        </p>
        <div class="flex gap-1">
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="Twitter">
              <IconBrandTwitter class="h-4 w-4" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="YouTube">
              <IconBrandYoutube class="h-4 w-4" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="Instagram">
              <IconBrandInstagram class="h-4 w-4" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="GitHub">
              <IconBrandGithub class="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>
