<script lang="ts">
export const description = "Tiga kartu kontak berikon tanpa formulir."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, PhoneIcon } from '@lucide/vue'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center py-16">
    <div class="text-center">
      <b class="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        Contact Us
      </b>
      <h2 class="mt-3 font-medium text-4xl tracking-tight">Get In Touch</h2>
      <p class="mt-3 text-lg text-muted-foreground md:text-xl">
        Our friendly team is always here to chat
      </p>
      <div class="mx-auto grid max-w-(--breakpoint-xl) gap-16 px-6 py-24 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-3">
        <div class="flex flex-col items-center text-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-primary/5 text-primary shadow-xl/2 dark:bg-primary/10">
            <MailIcon />
          </div>
          <h3 class="mt-6 font-medium text-xl">Email</h3>
          <p class="mt-2 text-muted-foreground">
            Our friendly team is here to help.
          </p>
          <a
            class="mt-4 font-medium text-primary"
            href="mailto:akashmoradiya3444@gmail.com"
          >
            akashmoradiya3444@gmail.com
          </a>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-primary/5 text-primary shadow-xl/2 dark:bg-primary/10">
            <MapPinIcon />
          </div>
          <h3 class="mt-6 font-medium text-xl">Office</h3>
          <p class="mt-2 text-muted-foreground">
            Come say hello at our office HQ.
          </p>
          <a
            class="mt-4 font-medium text-primary"
            href="https://map.google.com"
            target="_blank"
          >
            100 Smith Street Collingwood <br /> VIC 3066 AU
          </a>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-primary/5 text-primary shadow-xl/2 dark:bg-primary/10">
            <PhoneIcon />
          </div>
          <h3 class="mt-6 font-medium text-xl">Phone</h3>
          <p class="mt-2 text-muted-foreground">Mon-Fri from 8am to 5pm.</p>
          <a
            class="mt-4 font-medium text-primary"
            href="tel:akashmoradiya3444@gmail.com"
          >
            +1 (555) 000-0000
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
