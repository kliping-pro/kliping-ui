<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const areaPath = 'M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z'
const strokePath = 'M0 52L18 40L36 46L54 70L72 50L100 49'
</script>

<template>
  <Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
    <CardHeader>
      <CardTitle>Analytics</CardTitle>
      <CardDescription>
        <!--
          `as="span"`, bukan bawaannya.

          Badge digambar Primitive milik reka-ui, yang tanpa `as` menghasilkan
          div — sementara CardDescription adalah paragraf. Div di dalam paragraf
          ditolak parser HTML: paragrafnya ditutup paksa, susunan simpul di
          peramban jadi berbeda dari yang dirender server, dan Vue membuang
          hasil render server di bagian ini lalu menggambar ulang.
        -->
        418.2K Visitors <Badge as="span">+10%</Badge>
      </CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">
          View Analytics
        </Button>
      </CardAction>
    </CardHeader>
    <svg
      viewBox="0 0 100 86"
      preserveAspectRatio="none"
      class="aspect-[1/0.35] w-full text-chart-1"
      role="img"
      aria-label="Visitor trend"
    >
      <path :d="areaPath" fill="currentColor" opacity="0.28" />
      <path
        :d="strokePath"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </Card>
</template>
