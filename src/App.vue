<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

/**
 * Halaman uji internal.
 *
 * Situsnya adalah dokumentasi VitePress; halaman ini bukan bagian dari situs
 * dan tidak pernah dideploy. Gunanya satu: menjalankan komponennya di luar
 * dokumentasi, di aplikasi Vite polos, untuk memastikan tidak ada yang
 * diam-diam bergantung pada kerangka dokumentasi.
 *
 * `npm run dev` membuka halaman ini. `npm run build` memeriksa tipe seluruh
 * `src/` lalu membangunnya — itu pemeriksaan yang tidak dilakukan `docs:build`,
 * dan halaman ini yang menjaganya tetap berjalan.
 */
const isDark = ref(false)
const themeClass = computed(() => (isDark.value ? 'dark' : ''))

const stats = [
  { label: 'Total components', value: '66' },
  { label: 'Demos', value: '319' },
  { label: 'Blocks', value: '34' },
  { label: 'Charts', value: '23' },
]
</script>

<template>
  <ConfigProvider>
    <TooltipProvider>
      <div :class="themeClass">
        <main class="bg-background text-foreground min-h-svh">
          <div class="mx-auto flex max-w-2xl flex-col gap-8 p-8">
            <div class="flex items-start justify-between gap-4">
              <div class="flex flex-col gap-1">
                <h1 class="text-2xl font-semibold tracking-tight">
                  Kliping test page
                </h1>
                <p class="text-muted-foreground text-sm">
                  Not part of the site. Used to run the components outside the
                  documentation.
                </p>
              </div>
              <label class="flex shrink-0 items-center gap-2 text-sm">
                <Switch v-model="isDark" /> Dark
              </label>
            </div>

            <Separator />

            <div class="flex flex-wrap items-center gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Delete</Button>
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Card v-for="stat in stats" :key="stat.label" class="gap-1 py-4">
                <CardHeader class="px-4">
                  <CardDescription class="text-xs">
                    {{ stat.label }}
                  </CardDescription>
                  <CardTitle class="text-2xl tabular-nums">
                    {{ stat.value }}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>Enter your email to continue.</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <Button class="w-full">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  </ConfigProvider>
</template>
