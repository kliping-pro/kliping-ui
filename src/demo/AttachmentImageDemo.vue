<script setup lang="ts">
import { XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/components/ui/attachment'

const images = [
  {
    name: 'workspace.png',
    meta: 'PNG · 820 KB',
    src: '/samples/photos/photo-10.svg',
    alt: 'Workspace',
  },
  {
    name: 'desk-reference.jpg',
    meta: 'JPG · 1.1 MB',
    src: '/samples/photos/photo-11.svg',
    alt: 'Desk',
  },
  {
    name: 'office-reference.jpg',
    meta: 'JPG · 940 KB',
    src: '/samples/photos/photo-12.svg',
    alt: 'Office',
  },
]
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <AttachmentGroup class="w-full">
      <template v-for="image in images" :key="image.name">
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt">
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{{ image.name }}</AttachmentTitle>
            <AttachmentDescription>{{ image.meta }}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="`Remove ${image.name}`">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger
            as-child
          >
            <a
              :href="image.src"
              target="_blank"
              rel="noreferrer"
              :aria-label="`Open ${image.name}`"
            />
          </AttachmentTrigger>
        </Attachment>
      </template>
    </AttachmentGroup>
  </div>
</template>
