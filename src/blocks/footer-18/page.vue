<script lang="ts">
export const description = "Brand dan tagline di kiri, tiga kolom tautan, lalu kutipan dan hak cipta bergaris atas."
</script>

<script setup lang="ts">
const LINKS = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "#" },
      { title: "Careers", href: "#" },
    ],
  },
  {
    title: "Pages",
    items: [
      { title: "Login", href: "#" },
      { title: "Register", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms", href: "#" },
      { title: "Privacy", href: "#" },
    ],
  },
]

const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="pt-20 pb-8">
    <div class="container mx-auto">
      <div class="mb-12 grid grid-cols-1 items-start justify-between gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <h6 class="text-2xl font-semibold">Acme Inc.</h6>
          <p class="text-muted-foreground mt-3 max-w-md">
            The reward for getting on the stage is fame.
          </p>
        </div>
        <div class="grid grid-cols-3 gap-x-8 gap-y-6 md:ml-auto">
          <div v-for="{ title, items } in LINKS" :key="title" class="space-y-3">
            <p class="mb-3 font-semibold">{{ title }}</p>
            <ul class="space-y-3">
              <li v-for="item in items" :key="item.title">
                <a
                  :href="item.href"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border-border flex flex-col items-start justify-between gap-6 border-t pt-8 md:flex-row md:items-center">
        <p class="text-muted-foreground max-w-2xl text-sm">
          The price of fame is you can't get off the stage.
        </p>
        <p class="text-muted-foreground text-sm whitespace-nowrap">
          &copy; {{ YEAR }} Acme Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
