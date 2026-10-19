<script lang="ts">
export const description = "Pengaturan akun stylist dengan unggah foto profil, peran, dan izin akses."
</script>

<script setup lang="ts">
import { UploadIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <section class="grid min-h-screen place-items-center py-16">
    <Card class="mx-auto w-full max-w-3xl p-6 lg:p-8">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold">Stylist Account Settings</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Configure your profile, roles, and permissions for your stylist
          account.
        </p>
      </div>
      <form action="#" class="space-y-6">
        <div class="space-y-2">
          <Label for="avatar">Profile Photo</Label>
          <div class="flex items-center gap-4">
            <div class="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed">
              <UploadIcon class="text-muted-foreground h-8 w-8" />
            </div>
            <div class="flex-1">
              <p class="text-muted-foreground text-sm">
                PNG, JPG, JPEG or GIF (max. 800x400px)
              </p>
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept=".png,.jpg,.jpeg,.gif"
                class="mt-2"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="firstName">First Name</Label>
            <Input id="firstName" name="firstName" type="text" />
          </div>

          <div class="space-y-2">
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" type="text" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="contactEmail">Contact Email</Label>
          <Input id="contactEmail" name="contactEmail" type="email" />
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="userRole">Role</Label>
            <Select name="userRole">
              <SelectTrigger id="userRole" class="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stylist">Stylist</SelectItem>
                <SelectItem value="store-manager">Store Manager</SelectItem>
                <SelectItem value="creative-lead">Creative Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="languages">Languages</Label>
            <Input
              id="languages"
              name="languages"
              type="text"
              placeholder="e.g. English, Italian"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="e.g. Fashion Consultant"
            />
          </div>

          <div class="space-y-2">
            <Label for="accountType">Account Type</Label>
            <Select name="accountType">
              <SelectTrigger id="accountType" class="w-full">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="permissionLevel">Permission Level</Label>
            <Select name="permissionLevel">
              <SelectTrigger id="permissionLevel" class="w-full">
                <SelectValue placeholder="Select permission level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="emailStatus">Email Verified</Label>
            <Input
              id="emailStatus"
              name="emailStatus"
              type="text"
              model-value="Verified"
              disabled
            />
          </div>
        </div>

        <div class="flex gap-4">
          <Button type="button" variant="secondary" class="flex-1">
            Upload New Photo
          </Button>
          <Button type="button" variant="destructive" class="flex-1">
            Delete Account
          </Button>
        </div>
      </form>
    </Card>
  </section>
</template>
