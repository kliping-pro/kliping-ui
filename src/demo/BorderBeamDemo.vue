<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <Card class="relative w-80 overflow-hidden">
    <CardHeader>
      <CardTitle>Upgrade to Pro</CardTitle>
      <CardDescription>Unlimited projects and priority support.</CardDescription>
    </CardHeader>
    <CardContent class="text-sm text-muted-foreground">
      Billed yearly. Cancel anytime.
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Upgrade
      </Button>
    </CardFooter>
    <BorderBeam :duration="8" :size="100" />
  </Card>
</template>
