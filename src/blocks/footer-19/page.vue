<script lang="ts">
export const description = "Satu baris berisi lima tautan tebal dan teks hak cipta."
</script>

<script setup lang="ts">
const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "About Us", href: "#" },
  { title: "Contact Information", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Terms & Conditions", href: "#" },
  { title: "FAQ", href: "#" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto text-center">
      <div class="flex flex-row flex-wrap items-center !justify-center gap-6 lg:!justify-between">
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li v-for="({ title, href }, key) in LINKS" :key="key">
            <a
              :href="href"
              class="text-foreground hover:text-primary font-semibold"
            >
              {{ title }}
            </a>
          </li>
        </ul>
        <p class="text-foreground text-sm font-medium">
          All rights reserved. Copyright &copy; {{ YEAR }} Acme Inc.
        </p>
      </div>
    </div>
  </footer>
</template>
