<script lang="ts">
export const description = "Menempel di pojok tombol ikon, sebagai penghitung pemberitahuan."
</script>

<script setup lang="ts">
import { Bell, MailIcon, MessageSquare } from '@lucide/vue'
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex items-center gap-5">
    <Button class="relative" size="icon" variant="outline">
      <Bell />
      <Badge class="absolute top-0 right-0 min-w-5.5 translate-x-1/2 -translate-y-1/2 px-1">
        2
      </Badge>
    </Button>
    <Button class="relative" size="icon" variant="outline">
      <MailIcon />
      <Badge
        class="absolute top-0 right-0 min-w-5.5 translate-x-1/2 -translate-y-1/2 px-1"
        variant="destructive"
      >
        @
      </Badge>
    </Button>
    <Button class="relative rounded-full" size="icon" variant="outline">
      <MessageSquare />
      <Badge
        class="absolute -top-2 -right-2 min-w-4.5 px-0.75 py-0.25"
        variant="destructive"
      >
        @
      </Badge>
    </Button>
  </div>
</template>
