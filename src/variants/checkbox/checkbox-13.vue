<script lang="ts">
export const description = "Daftar peran dengan keterangan singkat di tiap barisnya."
</script>

<script setup lang="ts">
import {
  EyeIcon,
  PencilIcon,
  ShieldIcon,
  UserCircleIcon,
  UserIcon,
} from '@lucide/vue'
import { Checkbox } from '@/components/ui/checkbox'

const roles = [
  {
    name: "Administrator",
    value: "administrator",
    description: "Full system access",
    icon: ShieldIcon,
    defaultChecked: true,
  },
  {
    name: "Editor",
    value: "editor",
    description: "Content management only",
    icon: PencilIcon,
  },
  {
    name: "Moderator",
    value: "moderator",
    description: "User content moderation",
    icon: EyeIcon,
    defaultChecked: true,
  },
  {
    name: "User",
    value: "user",
    description: "Basic feature access",
    icon: UserIcon,
  },
  {
    name: "Viewer",
    value: "viewer",
    description: "Read-only permissions",
    icon: EyeIcon,
  },
  {
    name: "Guest",
    value: "guest",
    description: "Limited public access",
    icon: UserCircleIcon,
  },
]
</script>

<template>
  <div class="w-full max-w-xs space-y-3 rounded-lg border p-4">
    <label v-for="role in roles"
      class="flex items-center justify-between gap-2"
      :for="role.value"
      :key="role.value"
    >
      <div class="flex items-center gap-2">
        <div class="flex size-9 items-center justify-center rounded-md bg-muted">
          <component :is="role.icon" class="size-4.5" />
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="font-medium text-sm">{{ role.name }}</span>
          <span class="text-muted-foreground text-sm">
            {{ role.description }}
          </span>
        </div>
      </div>
      <Checkbox
        :default-checked="role.defaultChecked"
        :id="role.value"
        :value="role.value"
      />
    </label>
  </div>
</template>
