<script lang="ts">
export const description = "Kartu berjudul dengan deskripsi, isi, dan satu tombol di kakinya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>
        This is a brief description of the card content.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-muted-foreground text-sm">
        More detailed information goes here in the card content area.
      </p>
    </CardContent>
    <CardFooter>
      <Button>Learn More</Button>
    </CardFooter>
  </Card>
</template>
