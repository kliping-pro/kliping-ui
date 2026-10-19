<script lang="ts">
export const description = "Empat kartu kontak dengan tautan langsung."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from '@lucide/vue'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center pt-12 pb-16 md:pt-16">
    <div class="mx-auto w-full max-w-(--breakpoint-xl) px-6 xl:px-0">
      <b class="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        Contact Us
      </b>
      <h2 class="mt-3 font-medium text-4xl tracking-[-0.04em]">
        We'd love to hear from you
      </h2>
      <p class="mt-3 text-lg text-muted-foreground md:text-xl">
        Our friendly team is always here to chat.
      </p>
      <div class="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="rounded-xl border border-dashed bg-muted/20 p-6 pb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground dark:bg-muted">
            <MailIcon />
          </div>
          <h3 class="mt-8 font-medium text-xl">Email</h3>
          <p class="mt-1.5 mb-4 text-muted-foreground">
            Our friendly team is here to help.
          </p>
          <!-- Alamat surel ini satu kata panjang yang tidak muat di kartu
               selebar ponsel 320–360px. Di bawah sm <wbr> memberinya tempat
               patah setelah @; mulai sm <wbr>-nya disembunyikan supaya surel
               tetap satu baris seperti sumbernya. -->
          <a
            class="font-medium"
            href="mailto:akashmoradiya3444@gmail.com"
          >
            akashmoradiya3444@<wbr class="sm:hidden">gmail.com
          </a>
        </div>
        <div class="rounded-xl border border-dashed bg-muted/20 p-6 pb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground dark:bg-muted">
            <MessageCircle />
          </div>
          <h3 class="mt-8 font-medium text-xl">Live chat</h3>
          <p class="mt-1.5 mb-4 text-muted-foreground">
            Our friendly team is here to help.
          </p>
          <a class="font-medium" href="#">
            Start new chat
          </a>
        </div>
        <div class="rounded-xl border border-dashed bg-muted/20 p-6 pb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground dark:bg-muted">
            <MapPinIcon />
          </div>
          <h3 class="mt-8 font-medium text-xl">Office</h3>
          <p class="mt-1.5 mb-4 text-muted-foreground">
            Come say hello at our office HQ.
          </p>
          <a
            class="font-medium"
            href="https://map.google.com"
            target="_blank"
          >
            100 Smith Street Collingwood <br /> VIC 3066 AU
          </a>
        </div>
        <div class="rounded-xl border border-dashed bg-muted/20 p-6 pb-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground dark:bg-muted">
            <PhoneIcon />
          </div>
          <h3 class="mt-8 font-medium text-xl">Phone</h3>
          <p class="mt-1.5 mb-4 text-muted-foreground">
            Mon-Fri from 8am to 5pm.
          </p>
          <a class="font-medium" href="tel:akashmoradiya3444@gmail.com">
            +1 (555) 000-0000
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
