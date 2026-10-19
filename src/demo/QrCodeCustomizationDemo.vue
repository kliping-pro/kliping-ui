<!-- example: 2. Customization -->
<script setup lang="ts">
import { QRCode, QRCodeCanvas, QRCodeSkeleton } from '@/components/qr-code'
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://kliping.pro" :size="150" foreground-color="#3b82f6" background-color="#f1f5f9">
        <QRCodeCanvas />
        <QRCodeSkeleton />
      </QRCode>
      <p class="text-sm text-muted-foreground">
        Custom Colors
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://kliping.pro" :size="150" level="H" foreground-color="#dc2626">
        <QRCodeCanvas />
        <QRCodeSkeleton />
      </QRCode>
      <p class="text-sm text-muted-foreground">
        High Error Correction
      </p>
    </div>
  </div>
</template>
