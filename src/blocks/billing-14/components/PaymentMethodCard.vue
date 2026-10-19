<script setup lang="ts">
import { MailIcon, MapPinIcon } from '@lucide/vue'
import { IconBrandVisa } from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Payment method</CardTitle>
      <CardAction>
        <Button variant="ghost" size="sm">Update</Button>
      </CardAction>
    </CardHeader>
    <CardContent class="space-y-5">
      <div class="from-foreground to-foreground/75 text-background relative flex aspect-[1.7] flex-col justify-between overflow-hidden rounded-lg bg-linear-135 p-4 shadow-sm">
        <div class="pointer-events-none absolute -top-12 -right-8 size-36 rounded-full bg-current opacity-[0.08]" aria-hidden="true" />
        <div class="flex items-start justify-between">
          <div class="h-6 w-8 rounded-sm bg-current/25" aria-hidden="true" />
          <IconBrandVisa class="size-8" aria-label="Visa" />
        </div>
        <div>
          <p class="font-mono text-base tracking-[0.18em] tabular-nums">•••• 4242</p>
          <div class="mt-1 flex justify-between text-xs opacity-75">
            <span>Nadia Putri</span>
            <span class="tabular-nums">04/28</span>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Ikon ditaruh di dalam <dt> (diposisikan absolut): anak <dl> hanya
           boleh pasangan dt/dd, atau <div> yang isinya dt/dd. -->
      <dl class="space-y-3 text-sm">
        <div class="relative min-w-0 ps-7">
          <dt class="text-muted-foreground text-xs">
            <MailIcon class="text-muted-foreground absolute start-0 top-0.5 size-4" />
            Billing email
          </dt>
          <dd class="truncate font-medium">finance@rasastudio.co</dd>
        </div>
        <div class="relative min-w-0 ps-7">
          <dt class="text-muted-foreground text-xs">
            <MapPinIcon class="text-muted-foreground absolute start-0 top-0.5 size-4" />
            Billing address
          </dt>
          <dd class="font-medium">Jl. Jend. Sudirman 52, Jakarta 12190</dd>
        </div>
      </dl>
    </CardContent>
  </Card>
</template>
