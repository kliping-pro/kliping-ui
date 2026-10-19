<script lang="ts">
export const description = "Inisial berlatar warna, empat warna berbeda."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarFallback class="bg-slate-500 text-white">C</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500 text-white">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-rose-500 text-white">C</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-cyan-500 text-white">C</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-green-500 text-white">C</AvatarFallback>
      </Avatar>
    </div>
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarFallback class="bg-slate-500/25 text-slate-500">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-indigo-500/25 text-indigo-500">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-rose-500/25 text-rose-500">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-cyan-500/25 text-cyan-500">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback class="bg-green-500/25 text-green-500">
          C
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>
