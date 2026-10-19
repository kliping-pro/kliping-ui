<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Alamatnya dibaca dari env, bukan ditulis di dalam template.
 *
 * Ini demo, jadi isinya ikut tersalin ke project setiap orang yang memasangnya
 * — dan URL yang tertulis langsung akan ikut tersalin juga, lalu menetap di
 * sana sebagai alamat yang salah. Cadangannya tetap disebutkan supaya demo ini
 * tidak kosong saat dibuka tanpa `.env`.
 */
const shareUrl = `${import.meta.env.VITE_APP_URL ?? 'https://kliping.pro'}/installation`

const isDesktop = useMediaQuery('(min-width: 640px)')

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
  Footer: isDesktop.value ? DialogFooter : DrawerFooter,
  Close: isDesktop.value ? DialogClose : DrawerClose,
}))

const open = ref(false)
</script>

<template>
  <component :is="Modal.Root" v-model:open="open">
    <component :is="Modal.Trigger" as-child>
      <Button variant="outline">
        Open Dialog
      </Button>
    </component>
    <component
      :is="Modal.Content"
      class="sm:max-w-md" :class="[
        { 'px-2 pb-8 *:px-4': !isDesktop },
      ]"
    >
      <component :is="Modal.Header">
        <component :is="Modal.Title">
          Share Link
        </component>
        <component :is="Modal.Description">
          Anyone who has this link will be able to view this.
        </component>
      </component>

      <div class="flex items-center gap-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <Input
            id="link"
            :default-value="shareUrl"
            read-only
          />
        </div>
      </div>

      <component :is="Modal.Footer" class="pt-4">
        <component :is="Modal.Close" as-child>
          <Button variant="outline">
            Close
          </Button>
        </component>
      </component>
    </component>
  </component>
</template>
