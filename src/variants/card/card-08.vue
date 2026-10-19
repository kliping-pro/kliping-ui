<script lang="ts">
export const description = "Kartu testimoni dengan tanda kutip besar di latarnya."
</script>

<script setup lang="ts">
import { Quote } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <Card class="relative w-full max-w-sm gap-0 border-none bg-muted/70 pt-0 pb-4 shadow-none">
    <Quote class="absolute top-3 right-2 h-16 w-16 stroke-[1.5px] text-foreground/10" />
    <CardHeader class="py-5">
      <div class="flex items-center gap-3">
        <Avatar class="h-12 w-12">
          <AvatarImage src="/samples/avatars/avatar-22.svg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="flex flex-col gap-1">
          <span class="font-semibold text-[15px] leading-none">
            shadcn
          </span>
          <span class="text-muted-foreground text-sm leading-none">
            @shadcn
          </span>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p class="text-[15px] text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
        ullamcorper, augue at commodo interdum, erat dolor egestas eros, eu
        finibus turpis nunc at purus. Sed elementum rutrum nibh, a egestas
        turpis porttitor eu.
      </p>
    </CardContent>
  </Card>
</template>
