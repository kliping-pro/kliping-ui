<script lang="ts">
export const description = "Kartu formulir daftar akun: nama, Email, Password, dan tombol Sign Up selebar kartu."
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Create Account</CardTitle>
      <CardDescription>
        Enter your information to get started
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="space-y-2">
        <Label for="card-13-name">Full Name</Label>
        <Input id="card-13-name" placeholder="John Doe" />
      </div>
      <div class="space-y-2">
        <Label for="card-13-email">Email Address</Label>
        <Input id="card-13-email" type="email" placeholder="john@example.com" />
      </div>
      <div class="space-y-2">
        <Label for="card-13-password">Password</Label>
        <Input id="card-13-password" type="password" placeholder="••••••••" />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Sign Up
      </Button>
    </CardFooter>
  </Card>
</template>
