<script setup lang="ts">
import { FileCodeIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
import { Spinner } from '@/components/ui/spinner'

const images = [
  {
    name: 'workspace.png',
    meta: 'PNG · 820 KB',
    src: '/samples/photos/photo-09.svg',
    alt: 'Workspace',
  },
  {
    name: 'desk-reference.jpg',
    meta: 'JPG · 1.1 MB',
    src: '/samples/photos/photo-10.svg',
    alt: 'Desk',
  },
  {
    name: 'office-reference.jpg',
    meta: 'JPG · 940 KB',
    src: '/samples/photos/photo-11.svg',
    alt: 'Office',
  },
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <AttachmentGroup>
      <template v-for="image in images" :key="image.name">
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt">
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{{ image.name }}</AttachmentTitle>
            <AttachmentDescription>{{ image.meta }}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </template>
    </AttachmentGroup>
    <Attachment state="uploading" class="w-full">
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment class="w-full">
      <AttachmentMedia>
        <FileCodeIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>message-renderer.vue</AttachmentTitle>
        <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove message-renderer.vue">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</template>
