<!-- example: 1. Confirmation Dialog -->
<script setup lang="ts">
import { Loader2, Trash } from '@lucide/vue'
import { ref } from 'vue'
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'

const open = ref(false)
const isDeleting = ref(false)

function onDelete() {
  isDeleting.value = true
  // Simulasi penghapusan.
  setTimeout(() => {
    isDeleting.value = false
    open.value = false
  }, 1000)
}
</script>

<template>
  <ResponsiveDialog v-model:open="open">
    <ResponsiveDialogTrigger as-child>
      <Button variant="destructive">
        <Trash />
        Delete Project
      </Button>
    </ResponsiveDialogTrigger>
    <ResponsiveDialogContent>
      <ResponsiveDialogHeader>
        <ResponsiveDialogTitle>Delete project?</ResponsiveDialogTitle>
        <ResponsiveDialogDescription>
          This will permanently delete "My Awesome Project" and all of its data. This action cannot be undone.
        </ResponsiveDialogDescription>
      </ResponsiveDialogHeader>
      <ResponsiveDialogFooter>
        <ResponsiveDialogClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </ResponsiveDialogClose>
        <Button variant="destructive" :disabled="isDeleting" @click="onDelete">
          <Loader2 v-if="isDeleting" class="size-4 animate-spin" />
          Delete
        </Button>
      </ResponsiveDialogFooter>
    </ResponsiveDialogContent>
  </ResponsiveDialog>
</template>
