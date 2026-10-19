<script lang="ts">
export const description = "Form perbarui profil staf dengan username, Email kerja, dan Password baru."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <section class="grid min-h-screen place-items-center py-16">
    <Card class="mx-auto w-full max-w-2xl p-6 lg:p-8">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold">
          Update Retail Staff Profile
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Manage employee account credentials and contact information for
          retail team members.
        </p>
      </div>
      <form action="#" class="space-y-6">
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="e.g. elena.moreno"
          />
        </div>

        <div class="space-y-2">
          <Label for="email">Work Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. elena@fashionco.com"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">New Password</Label>
          <Input id="password" name="password" type="password" />
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
        </div>

        <Button type="submit" class="w-full">
          Update Profile
        </Button>
      </form>
    </Card>
  </section>
</template>
