<script lang="ts">
export const description = "Langkah dalam kartu terpisah, satu kartu per langkah."
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
import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

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

const totalSteps = setupGuideSteps.length;
const completedSteps = setupGuideSteps.filter(
  (step) => step.status === "completed"
).length

const completionPercentage = (completedSteps / totalSteps) * 100
</script>

<template>
  <div class="px-6 py-12">
    <Card class="mx-auto my-10 max-w-xl gap-1 overflow-hidden rounded-xl bg-card pb-0 sm:my-16">
      <CardHeader class="gap-1.5 px-8">
        <CardTitle class="font-medium text-2xl tracking-[-0.03em]">
          Get Started with Your Account
        </CardTitle>
        <CardDescription class="text-base text-muted-foreground">
          Follow these quick steps to set up your account and unlock features.
        </CardDescription>

        <Progress class="mt-4" :value="completionPercentage" />
      </CardHeader>

      <CardContent class="mt-7 flex flex-col bg-card px-0">
        <div v-for="step in setupGuideSteps"
          :class="cn(
            'relative isolate flex items-center gap-5 border-t px-6 py-4 sm:px-8',
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
              <Button v-if="step.status === 'pending'"
                class="h-6 sm:ml-0"
                size="sm"
                variant="secondary"
              >
                Start <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
