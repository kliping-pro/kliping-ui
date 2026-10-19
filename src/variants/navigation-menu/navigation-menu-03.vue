<script lang="ts">
export const description = "Panel besar dua kolom, dengan kartu bermerek di kirinya."
</script>

<script setup lang="ts">
import { BoxesIcon } from '@lucide/vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import ListItem from '@/variants/navigation-menu/components/ListItem.vue'

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
</script>

<template>
  <NavigationMenu class="z-20">
    <NavigationMenuList class="flex-wrap">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <a
                  class="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-hidden focus:shadow-md"
                  href="/"
                >
                  <BoxesIcon class="h-8 w-8" aria-hidden="true" />
                  <div class="mt-4 mb-2 font-medium text-lg">
                    Acme UI
                  </div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    A collection of customized UI blocks and components
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <ListItem href="#" title="Introduction">
              Re-usable components built using Radix UI and Tailwind CSS.
            </ListItem>
            <ListItem href="#" title="Installation">
              How to install dependencies and structure your app.
            </ListItem>
            <ListItem href="#" title="Typography">
              Styles for headings, paragraphs, lists...etc
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-1 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <ListItem v-for="component in components"
              :href="component.href"
              :key="component.title"
              :title="component.title"
            >
              {{ component.description }}
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <a href="#">Documentation</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
