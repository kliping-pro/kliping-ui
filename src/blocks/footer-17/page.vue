<script lang="ts">
export const description = "Enam tautan tebal rata tengah dengan hak cipta di bawahnya."
</script>

<script setup lang="ts">
const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "Company", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Team", href: "#" },
  { title: "Products", href: "#" },
  { title: "Blogs", href: "#" },
  { title: "Pricing", href: "#" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto grid place-items-center">
      <ul class="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <li v-for="({ title, href }, key) in LINKS" :key="key">
          <a
            :href="href"
            class="text-foreground hover:text-primary font-semibold"
          >
            {{ title }}
          </a>
        </li>
      </ul>
      <p class="text-foreground">Copyright &copy; {{ YEAR }} Acme Inc.</p>
    </div>
  </footer>
</template>
