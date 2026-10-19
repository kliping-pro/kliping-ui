<script lang="ts">
export const description = "Keterangan panjang dengan tautan pelajari lebih lanjut."
</script>

<script setup lang="ts">
import { ExternalLink, OctagonAlert, Trash } from '@lucide/vue'
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
import { Button } from '@/components/ui/button'
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="max-w-md!">
      <AlertDialogHeader class="pb-4">
        <AlertDialogTitle>
          <div class="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
            <OctagonAlert class="h-5 w-5 text-destructive" />
          </div>
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription class="text-[15px]">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="border-t">
        <Button
          class="mr-auto -ml-3 text-muted-foreground"
          variant="link"
        >
          Learn more <ExternalLink />
        </Button>
        <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">
          <Trash />
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
