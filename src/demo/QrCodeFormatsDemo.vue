<!-- example: 1. Different Formats -->
<script setup lang="ts">
import { QRCode, QRCodeCanvas, QRCodeDownload, QRCodeImage, QRCodeSvg } from '@/components/qr-code'
import { Button } from '@/components/ui/button'

const value = 'https://kliping.pro'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    <div class="flex flex-col items-center gap-2">
      <QRCode :value="value" :size="120">
        <QRCodeCanvas />
        <QRCodeDownload as-child format="png" filename="qr-canvas">
          <Button size="sm">
            Download PNG
          </Button>
        </QRCodeDownload>
      </QRCode>
      <p class="text-sm text-muted-foreground">
        Rendered as canvas
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode :value="value" :size="120">
        <QRCodeSvg />
        <QRCodeDownload as-child format="svg" filename="qr-svg">
          <Button size="sm">
            Download SVG
          </Button>
        </QRCodeDownload>
      </QRCode>
      <p class="text-sm text-muted-foreground">
        Rendered as SVG
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode :value="value" :size="120">
        <QRCodeImage alt="QR code" />
        <QRCodeDownload as-child format="png" filename="qr-image">
          <Button size="sm">
            Download PNG
          </Button>
        </QRCodeDownload>
      </QRCode>
      <p class="text-sm text-muted-foreground">
        Rendered as image
      </p>
    </div>
  </div>
</template>
