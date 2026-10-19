<script lang="ts">
export const description = "Kabar pembaruan: daftar fitur baru berikon dan lencana versi."
</script>

<script setup lang="ts">
import { CircleFadingArrowUp, Rocket } from '@lucide/vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="sm:max-w-lg!">
      <AlertDialogHeader>
        <div class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 sm:mx-0">
          <CircleFadingArrowUp class="h-[18px] w-[18px] text-primary" />
        </div>
        <AlertDialogTitle class="font-semibold text-2xl tracking-[-0.015em]">
          New Software Update Available
        </AlertDialogTitle>
        <AlertDialogDescription class="text-[15px]">
          A new software update is available for your device. Please update to
          the latest version to continue using the app.
        </AlertDialogDescription>
        <div class="mt-6! flex flex-wrap gap-2">
          <Badge variant="outline">Faster Performance</Badge>
          <Badge variant="outline">Advanced Blocks</Badge>
          <Badge variant="outline">Customized Components</Badge>
          <Badge variant="outline">UI Revamp</Badge>
          <Badge variant="outline">Security Improvements</Badge>
          <Badge variant="outline">Other Improvements</Badge>
          <Badge variant="outline">Bug Fixes</Badge>
          <Badge variant="outline">+ much more</Badge>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter class="mt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>
          <Rocket /> Update Now
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
