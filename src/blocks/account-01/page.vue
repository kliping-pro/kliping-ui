<script lang="ts">
export const description = "Pengaturan autentikasi dua faktor dengan daftar metode dan kode pemulihan."
</script>

<script setup lang="ts">
import {
  CircleAlertIcon,
  CircleCheckIcon,
  KeyRoundIcon,
  MessageSquareIcon,
  ShieldIcon,
  SmartphoneIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const TwoFactorMethods = [
  {
    title: "Security Keys",
    description:
      "Physical security keys provide the highest level of protection by requiring a hardware device for authentication.",
    value: "No security keys configured",
    action: "Add",
    icon: KeyRoundIcon,
    isConfigured: false,
    recommended: true,
  },
  {
    title: "Authenticator App",
    description:
      "Generate time-based one-time passwords (TOTP) using apps like Google Authenticator or Authy.",
    value: "Not configured",
    action: "Setup",
    icon: SmartphoneIcon,
    isConfigured: false,
    recommended: true,
  },
  {
    title: "SMS Number",
    description:
      "Receive verification codes via text message to your registered mobile number.",
    value: "+1 (555) 123-4567",
    action: "Edit",
    icon: MessageSquareIcon,
    isConfigured: true,
    recommended: false,
  },
]
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="flex flex-wrap items-start justify-between gap-4 border-b pb-6">
        <div class="flex items-center gap-3">
          <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
            <ShieldIcon class="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">
              Two-Factor Authentication
            </h2>
            <p class="text-muted-foreground mt-1 text-sm">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          class="border-green-500 bg-green-50 text-green-700"
        >
          <CircleCheckIcon class="mr-1 h-3 w-3" />
          Enabled
        </Badge>
      </div>

      <div class="space-y-0">
        <div
          v-for="(method, index) in TwoFactorMethods"
          :key="method.title"
          :class="`group flex flex-wrap items-center justify-between gap-6 py-6 ${
            index !== TwoFactorMethods.length - 1
              ? 'border-border border-b'
              : ''
          }`"
        >
          <div class="flex items-start gap-4">
            <div
              :class="`bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${method.isConfigured ? 'bg-primary/10' : ''}`"
            >
              <component
                :is="method.icon"
                :class="`h-6 w-6 ${method.isConfigured ? 'text-primary' : 'text-muted-foreground'}`"
              />
            </div>
            <div class="flex-1 space-y-2">
              <div class="flex items-center gap-2">
                <p class="font-semibold">{{ method.title }}</p>
                <span
                  v-if="method.recommended"
                  class="text-primary border-primary bg-primary/10 rounded-full border px-2 py-0.5 text-xs font-medium"
                >
                  Recommended
                </span>
              </div>
              <p class="text-muted-foreground text-sm">
                {{ method.description }}
              </p>
              <p
                :class="`text-sm ${
                  method.isConfigured
                    ? 'font-semibold'
                    : 'text-muted-foreground'
                }`"
              >
                <CircleCheckIcon v-if="method.isConfigured" class="mr-1 inline h-4 w-4 text-green-500" />
                {{ method.value }}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            :variant="method.isConfigured ? 'outline' : 'default'"
          >
            {{ method.action }}
          </Button>
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <div class="bg-muted/50 flex items-start gap-3 rounded-lg border p-4">
          <CircleAlertIcon class="mt-0.5 h-5 w-5 text-blue-500" />
          <div>
            <h4 class="mb-1 text-sm font-medium">Recovery Codes</h4>
            <p class="text-muted-foreground text-sm">
              Generate backup codes that can be used if you lose access to
              your 2FA methods. Store them securely in a safe place.
            </p>
            <Button variant="link" class="mt-2 h-auto p-0 text-sm">
              Generate Recovery Codes →
            </Button>
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline">View Activity Log</Button>
          <Button>Save Settings</Button>
        </div>
      </div>
    </Card>
  </div>
</template>
