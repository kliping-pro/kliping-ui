<script setup lang="ts">
import { ref } from 'vue'
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <ResponsiveDialog v-model:open="isOpen">
      <ResponsiveDialogTrigger as-child>
        <Button variant="outline">
          Edit profile
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent class="sm:max-w-sm">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Your changes are saved when you press Save.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <div class="grid gap-3 px-4 sm:px-0">
          <Label for="name">Name</Label>
          <Input id="name" default-value="Olivia Martin" />
        </div>
        <ResponsiveDialogFooter>
          <Button @click="isOpen = false">
            Save
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>

    <p class="text-muted-foreground text-sm">
      Narrow the window below 48rem: the dialog turns into a drawer from the
      bottom — not a restyled dialog, but a different component.
    </p>
  </div>
</template>
