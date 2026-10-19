<script lang="ts">
export const description = "Form ganti Password dua kolom dengan daftar syarat yang tervalidasi langsung."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CircleCheckIcon, CircleXIcon, ShieldIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PasswordField from '@/blocks/account-04/components/PasswordField.vue'

const PASSWORD_REQUIREMENTS = [
  {
    label: "At least 8 characters long",
    regex: /.{8,}/,
  },
  {
    label: "One uppercase letter (A-Z)",
    regex: /[A-Z]/,
  },
  {
    label: "One lowercase letter (a-z)",
    regex: /[a-z]/,
  },
  {
    label: "One number (0-9)",
    regex: /[0-9]/,
  },
  {
    label: "One special character (!@#$%^&*)",
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  },
]

const newPassword = ref<string | number>("")

const meetsRequirement = (regex: RegExp) => regex.test(String(newPassword.value))
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="border-b pb-6">
        <div class="flex items-center gap-3">
          <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
            <ShieldIcon class="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">
              Change Password
            </h2>
            <p class="text-muted-foreground mt-1 text-sm">
              Update your password to keep your account secure
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <form @submit.prevent>
            <PasswordField id="current-password" label="Current Password" />
            <PasswordField
              id="new-password"
              v-model="newPassword"
              label="New Password"
            />
            <PasswordField
              id="confirm-password"
              label="Confirm New Password"
            />
            <div class="mt-8 flex gap-3">
              <Button type="button" variant="outline" class="flex-1">
                Cancel
              </Button>
              <Button type="submit" class="flex-1">
                Update Password
              </Button>
            </div>
          </form>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="mb-4 flex items-center gap-2 font-semibold">
              <ShieldIcon class="text-muted-foreground h-5 w-5" />
              Password Requirements
            </h3>
            <p class="text-muted-foreground mb-6 text-sm">
              Your password must meet the following criteria for enhanced
              security:
            </p>
            <ul class="space-y-3">
              <li v-for="(req, index) in PASSWORD_REQUIREMENTS" :key="index" class="flex items-start gap-3">
                <CircleCheckIcon v-if="meetsRequirement(req.regex)" class="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <CircleXIcon v-else class="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                <span
                  :class="`text-sm ${
                    meetsRequirement(req.regex)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`"
                >
                  {{ req.label }}
                </span>
              </li>
            </ul>
          </div>

          <div class="bg-muted/50 rounded-lg border p-4">
            <h4 class="mb-2 text-sm font-medium">
              Security Best Practices
            </h4>
            <ul class="text-muted-foreground space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="mt-1">•</span>
                <span>Change your password regularly (every 90 days)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1">•</span>
                <span>Never share your password with anyone</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1">•</span>
                <span>Use a unique password for each account</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1">•</span>
                <span>Consider using a password manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
