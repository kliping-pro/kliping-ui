<script setup lang="ts">
import { AvatarGroup } from '@/components/avatar-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const people = ['AR', 'BS', 'CD', 'EF', 'GH', 'IJ']
</script>

<template>
  <div class="flex flex-col gap-6">
    <AvatarGroup :max="4">
      <Avatar v-for="initials in people" :key="initials">
        <AvatarFallback>{{ initials }}</AvatarFallback>
      </Avatar>
    </AvatarGroup>

    <AvatarGroup :max="4" reverse>
      <Avatar v-for="initials in people" :key="initials">
        <AvatarFallback>{{ initials }}</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  </div>
</template>
