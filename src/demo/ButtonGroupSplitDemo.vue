<script setup lang="ts">
import { PlusIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
</script>

<template>
  <ButtonGroup>
    <Button variant="secondary">
      Button
    </Button>
    <ButtonGroupSeparator />
    <Button size="icon" variant="secondary" aria-label="Add">
      <PlusIcon />
    </Button>
  </ButtonGroup>
</template>
