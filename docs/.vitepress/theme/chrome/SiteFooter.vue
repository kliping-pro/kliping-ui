<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()

/** Tautan footer dari `themeConfig.footer.links`; tautan luar dibuka di tab baru. */
const links = computed<{ text: string, link: string }[]>(() => theme.value.footer?.links ?? [])
const isExternal = (link: string) => /^https?:\/\//.test(link)
</script>

<template>
  <footer class="group-has-[[data-slot=docs]]/body:hidden">
    <div class="container-wrapper px-4 xl:px-6">
      <div class="flex min-h-(--footer-height) flex-col items-center justify-center gap-x-4 gap-y-1 py-4 text-center sm:flex-row">
        <p class="text-muted-foreground text-xs leading-loose sm:text-sm">
          <span v-if="theme.footer?.copyright">{{ theme.footer.copyright }}.</span>
          {{ theme.footer?.message }}
        </p>
        <nav v-if="links.length" aria-label="Footer" class="flex items-center gap-4 text-xs sm:text-sm">
          <a
            v-for="item in links"
            :key="item.link"
            :href="isExternal(item.link) ? item.link : withBase(item.link)"
            :target="isExternal(item.link) ? '_blank' : undefined"
            :rel="isExternal(item.link) ? 'noreferrer' : undefined"
            class="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            {{ item.text }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>
