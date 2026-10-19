<script lang="ts">
export const description = "Avatar di samping nama dan satu baris pesannya."
</script>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
  <div class="flex items-start gap-10 rounded-lg border p-4 shadow-sm/3">
    <div class="flex gap-3">
      <Avatar class="size-10">
        <AvatarImage alt="@shadcn" src="/samples/avatars/avatar-02.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-1 font-medium leading-none tracking-tight">
          John Doe
        </div>
        <span class="text-muted-foreground text-sm leading-none">
          Let's go to the park
        </span>
      </div>
    </div>
    <div class="flex flex-col justify-start gap-1">
      <span class="text-muted-foreground text-xs">12:00 AM</span>
      <div class="ms-auto flex h-5 w-fit min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-primary-foreground text-xs">
        2
      </div>
    </div>
  </div>
</template>
