<!-- example: 3. Overlay -->
<script setup lang="ts">
import { Box } from '@lucide/vue'
import { QRCode, QRCodeCanvas, QRCodeImage, QRCodeOverlay, QRCodeSkeleton, QRCodeSvg } from '@/components/qr-code'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://kliping.pro" :size="120" level="H" class="gap-4">
        <QRCodeSkeleton />
        <QRCodeCanvas />
        <QRCodeOverlay class="rounded-full border-2 border-background p-2">
          <Box class="size-6" />
        </QRCodeOverlay>
      </QRCode>
      <p class="text-center text-sm text-muted-foreground">
        Canvas with Logo
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://kliping.pro" :size="120" level="H" class="gap-4">
        <QRCodeSkeleton />
        <QRCodeSvg />
        <QRCodeOverlay class="rounded-full border-2 border-background bg-linear-to-br from-accent to-muted p-2">
          <Box class="size-6" />
        </QRCodeOverlay>
      </QRCode>
      <p class="text-center text-sm text-muted-foreground">
        SVG with Logo
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://kliping.pro" :size="120" level="H" class="gap-4">
        <QRCodeSkeleton />
        <QRCodeImage alt="QR code" />
        <QRCodeOverlay class="rounded-full border-2 border-background p-1.5">
          <Box class="size-6" />
        </QRCodeOverlay>
      </QRCode>
      <p class="text-center text-sm text-muted-foreground">
        Image with Logo
      </p>
    </div>
  </div>
</template>
