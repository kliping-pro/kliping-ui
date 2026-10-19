<script setup lang="ts">
import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <Card>
    <CardContent>
      <!-- Padding dan jarak dirapatkan dari bawaannya (`p-6 md:p-12 gap-6`).
           Kartu ini satu-satunya penghuni keempat di kolomnya, jadi tingginya
           yang menentukan seberapa jauh kolom itu menjulur melewati empat
           kolom lain. Dirapatkan, ujung petaknya jadi rata. -->
      <Empty class="gap-4 p-4 md:p-4">
        <EmptyMedia variant="icon">
          <HugeiconsIcon :icon="Add01Icon" :stroke-width="2" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Distribute a Track</EmptyTitle>
          <EmptyDescription>
            Upload your first master to Spotify and more.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Release</Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  </Card>
</template>
