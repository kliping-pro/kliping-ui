<script setup lang="ts">
import { ref } from 'vue'
import {
  QRCode,
  QRCodeDownload,
  QRCodeOverlay,
  QRCodeSkeleton,
  QRCodeSvg,
} from '@/components/qr-code'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const content = ref('https://kliping.pro')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <Input v-model="content" aria-label="QR code content" placeholder="Type anything" />

    <QRCode level="H" :size="180" :value="content">
      <QRCodeSkeleton />
      <QRCodeSvg />
      <QRCodeOverlay class="size-9 border">
        <span class="font-bold text-xs">KL</span>
      </QRCodeOverlay>
      <QRCodeDownload as-child format="svg">
        <Button size="sm" variant="outline">
          Download SVG
        </Button>
      </QRCodeDownload>
    </QRCode>
  </div>
</template>
