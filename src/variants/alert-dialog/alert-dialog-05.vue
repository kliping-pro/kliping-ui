<script lang="ts">
export const description = "Judul dan tombol tutupnya sebaris, dipisahkan garis."
</script>

<script setup lang="ts">
import { OctagonAlert, X } from '@lucide/vue'
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
    <AlertDialogContent>
      <div class="-mx-4 -mt-1 flex items-center justify-between border-b px-4 pb-3">
        <AlertDialogTitle>Delete Account</AlertDialogTitle>
        <AlertDialogCancel as-child>
          <Button size="icon-sm" variant="ghost">
            <X />
          </Button>
        </AlertDialogCancel>
      </div>
      <AlertDialogHeader class="pt-2">
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
      <AlertDialogFooter class="mt-2">
        <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
