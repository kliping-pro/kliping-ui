<script lang="ts">
export const description = "Daftar langkah bergaris pemisah dengan badge selesai."
</script>

<script setup lang="ts">
import {
  CheckIcon,
  ChevronRightIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  Zap,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

const setupGuideSteps = [
  {
    title: "Add your company logo",
    description: "Pull your company logo and branding into the platform.",
    time: "2 minutes",
    icon: ImageIcon,
    status: "completed",
  },
  {
    title: "Explore your personalized online client portal",
    description: "Let clients approve quotes, review jobs, and pay all online.",
    time: "5 minutes",
    icon: LayoutDashboardIcon,
    status: "pending",
  },
  {
    title: "Get paid with fast invoicing",
    description:
      "Create and send invoices your clients can pay online instantly.",
    time: "2 minutes",
    icon: Zap,
    status: "pending",
  },
  {
    title: "Create a winning quote",
    description: "Boost your revenue with customized, professional quotes.",
    time: "2 minutes",
    icon: FileTextIcon,
    status: "pending",
  },
  {
    title: "Create a website for your business",
    description: "Get your business online quickly with a free website setup.",
    time: "5 minutes",
    icon: GlobeIcon,
    status: "pending",
  },
]
</script>

<template>
  <div class="mx-auto max-w-(--breakpoint-md) px-6 py-10 sm:py-16">
    <h2 class="font-medium text-2xl tracking-[-0.03em] sm:text-3xl">
      Get Started with Your Account
    </h2>
    <p class="mt-2 text-muted-foreground sm:text-lg">
      Follow these quick steps to set up your account and unlock all the
      essential features.
    </p>

    <div class="mt-6 flex flex-col divide-y overflow-hidden rounded-xl border bg-card shadow-lg/[0.03]">
      <div v-for="step in setupGuideSteps"
        :class="cn(
          'relative isolate flex items-center gap-5 px-6 py-4 sm:px-8',
          {
            'bg-primary/8': step.status === 'completed',
            'cursor-pointer transition-colors hover:bg-muted/50':
              step.status === 'pending',
          }
        )"
        :key="step.title"
      >
        <!-- Decorative line -->
        <div
          :class="cn(
            'absolute inset-y-0 -z-1 translate-x-4 border-r border-dashed',
            {
              'border-primary/20 dark:border-primary/25':
                step.status === 'completed',
            }
          )"
        />

        <div
          :class="cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full bg-muted',
            {
              'bg-primary': step.status === 'completed',
              'border border-dashed': step.status === 'pending',
            }
          )"
        >
          <CheckIcon v-if="step.status === 'completed'" class="size-4 text-primary-foreground" />
          <component :is="step.icon" v-else class="size-4" />
        </div>

        <div class="flex grow flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div class="flex-1">
            <h3 class="font-medium">{{ step.title }}</h3>
          </div>

          <div class="leading-none">
            <Badge v-if="step.status === 'completed'">Completed</Badge>
            <Button v-if="step.status === 'pending'" class="h-6 sm:ml-0" size="sm" variant="secondary">
              Start <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
