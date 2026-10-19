<script lang="ts">
export const description = "Kartu paket harga, dengan tooltip penjelas di sampingnya."
</script>

<script setup lang="ts">
import { CircleHelpIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <Card class="w-full max-w-xs shadow-border/70 shadow-md">
    <CardHeader>
      <CardTitle class="font-semibold text-2xl tracking-tight">
        Pro Plan
      </CardTitle>
      <CardDescription>
        For teams that need advanced scheduling tools to streamline workflows
        and enhance collaboration, ensuring every meeting is productive and on
        track.
      </CardDescription>
    </CardHeader>
    <CardContent class="flex items-end text-muted-foreground text-sm leading-6">
      <span class="mt-1 font-semibold text-4xl text-foreground leading-none">
        $20
      </span>
      <span class="mr-1.5 ml-0.5">/mo</span>
      <Tooltip>
        <TooltipTrigger class="mb-1">
          <CircleHelpIcon class="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent class="max-w-xs">
          <p>
            Seats are required for users to connect calendars and create
            Calendly links to help book meetings - meeting invitees do not
            require an account or seat.
          </p>
        </TooltipContent>
      </Tooltip>
    </CardContent>
    <CardFooter class="mt-2 flex justify-between">
      <Button class="w-full" size="lg">
        Try for free
      </Button>
    </CardFooter>
  </Card>
</template>
