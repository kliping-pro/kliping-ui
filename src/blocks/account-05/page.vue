<script lang="ts">
export const description = "Daftar integrasi pihak ketiga dalam accordion dengan switch dan kode verifikasi."
</script>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  MessageCircleIcon,
  ShieldIcon,
} from '@lucide/vue'
import { IconBrandGithub } from '@tabler/icons-vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const INTEGRATIONS = [
  {
    id: "github",
    name: "GitHub",
    icon: IconBrandGithub,
    category: "Development",
    description:
      "Connect your GitHub account to sync repositories and track contributions.",
    isConfigured: false,
    connectedEmail: null,
    verificationCode: null,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: MessageCircleIcon, // Replaced Spotify icon with MessageCircle
    category: "Music",
    description:
      "Link your Spotify account to share playlists and sync listening activity.",
    isConfigured: true,
    connectedEmail: "emma@mail.com",
    verificationCode: "1172913",
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircleIcon,
    category: "Communication",
    description:
      "Integrate your Discord account to manage server connections and notifications.",
    isConfigured: false,
    connectedEmail: null,
    verificationCode: null,
  },
] as {
  id: string
  name: string
  icon: unknown
  category: string
  description: string
  isConfigured: boolean
  connectedEmail: string | null
  verificationCode: string | null
}[]

const activeIntegrations = ref<Record<string, boolean>>(
  INTEGRATIONS.reduce(
    (acc, integration) => {
      acc[integration.id] = integration.isConfigured
      return acc
    },
    {} as Record<string, boolean>,
  ),
)
const copiedCode = ref<string | null>(null)

const toggleIntegration = (id: string) => {
  activeIntegrations.value = {
    ...activeIntegrations.value,
    [id]: !activeIntegrations.value[id],
  }
}

let copyTimer: ReturnType<typeof setTimeout> | undefined

const copyVerificationCode = (code: string) => {
  navigator.clipboard.writeText(code)
  copiedCode.value = code
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copiedCode.value = null), 2000)
}

onBeforeUnmount(() => clearTimeout(copyTimer))
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
              Third-Party Integrations
            </h2>
            <p class="text-muted-foreground mt-1 text-sm">
              Manage and configure connections to external services and
              platforms
            </p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible class="space-y-4">
        <AccordionItem
          v-for="integration in INTEGRATIONS"
          :key="integration.id"
          :value="integration.id"
          class="border-border rounded-lg border"
        >
          <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
            <div class="flex min-w-0 flex-1 items-center gap-4">
              <div class="bg-muted/50 flex h-12 w-12 items-center justify-center rounded-lg">
                <component
                  :is="integration.icon"
                  :class="`h-6 w-6 ${activeIntegrations[integration.id] ? 'text-primary' : 'text-muted-foreground'}`"
                />
              </div>
              <div class="flex-1 space-y-1 text-left">
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold">{{ integration.name }}</h3>
                  <Badge
                    variant="outline"
                    class="text-muted-foreground"
                  >
                    {{ integration.category }}
                  </Badge>
                </div>
                <p class="text-muted-foreground line-clamp-1 text-sm">
                  {{ integration.description }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <Switch
                  :id="`${integration.id}-toggle`"
                  :model-value="activeIntegrations[integration.id]"
                  @update:model-value="toggleIntegration(integration.id)"
                />
                <Label
                  :for="`${integration.id}-toggle`"
                  class="cursor-pointer text-sm"
                >
                  {{ activeIntegrations[integration.id] ? "Enabled" : "Enable" }}
                </Label>
              </div>
              <AccordionTrigger class="hover:bg-muted/50 rounded px-3 py-2">
                <span class="text-sm font-medium">View More</span>
              </AccordionTrigger>
            </div>
          </div>
          <AccordionContent class="px-4 pb-6">
            <div v-if="!activeIntegrations[integration.id]" class="space-y-4">
              <p class="text-muted-foreground text-sm">
                You haven't added your {{ integration.name }} account
                or you aren't authorized. Click "Connect"
                to initiate the integration process.
              </p>
              <Button>
                <ExternalLinkIcon class="mr-2 h-4 w-4" />
                Connect {{ integration.name }}
              </Button>
            </div>
            <div v-else-if="integration.connectedEmail" class="space-y-4">
              <Card class="bg-muted/50 border p-4">
                <div class="flex items-center justify-between">
                  <div class="space-y-1">
                    <h4 class="font-semibold">Verification Code</h4>
                    <p class="text-muted-foreground text-sm">
                      Use this code to complete the integration
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <code class="bg-muted/50 rounded px-3 py-1 font-mono text-sm">
                      {{ integration.verificationCode }}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      @click="copyVerificationCode(integration.verificationCode!)"
                    >
                      <CheckIcon v-if="copiedCode === integration.verificationCode" class="mr-2 h-4 w-4 text-green-500" />
                      <CopyIcon v-else class="mr-2 h-4 w-4" />
                      {{ copiedCode === integration.verificationCode
                        ? "Copied"
                        : "Copy" }}
                    </Button>
                  </div>
                </div>
              </Card>
              <Card class="bg-muted/50 border p-4">
                <div class="flex items-center justify-between">
                  <div class="space-y-1">
                    <h4 class="font-semibold">Connected Account</h4>
                    <p class="text-muted-foreground text-sm">
                      Manage your linked {{ integration.name }} account
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-medium">
                      {{ integration.connectedEmail }}
                    </span>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div class="bg-muted/50 mt-6 rounded-lg border p-4">
        <div class="flex items-start gap-3">
          <ShieldIcon class="mt-0.5 h-5 w-5 text-blue-500" />
          <div>
            <h4 class="mb-1 text-sm font-medium">Integration Security</h4>
            <p class="text-muted-foreground text-sm">
              Ensure you trust the applications you connect. Review and manage
              third-party access to your account regularly. You can revoke
              access at any time by disabling the integration.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
