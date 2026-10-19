<script lang="ts">
export const description = "Panel tiga kolom bergaris pemisah."
</script>

<script setup lang="ts">
import {
  CreditCardIcon,
  Loader,
  type LucideIcon,
  SquareCheckIcon,
  SquareChevronUpIcon,
  SquarePowerIcon,
  ToggleRight,
} from '@lucide/vue'
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

const components: {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Accordion",
    href: "#",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    icon: SquareChevronUpIcon,
  },
  {
    title: "Button",
    href: "#",
    description: "Displays a button or a component that looks like a button.",
    icon: SquarePowerIcon,
  },
  {
    title: "Card",
    href: "#",
    description: "Displays a card with header, content, and footer.",
    icon: CreditCardIcon,
  },
  {
    title: "Checkbox",
    href: "#",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    icon: SquareCheckIcon,
  },
  {
    title: "Spinner",
    href: "#",
    description: "Informs users about the status of ongoing processes.",
    icon: Loader,
  },
  {
    title: "Switch",
    href: "#",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    icon: ToggleRight,
  },
]
</script>

<template>
  <NavigationMenu class="z-20 max-w-none">
    <!--
      Panelnya digantung di tepi kiri <nav>; dengan `max-w-none` tepi itu jadi
      tepi kiri kotak pratinjau, bukan tepi kiri deretan menunya, sehingga
      panel 900px di bawah Products tidak menjorok keluar layar.
    -->
    <NavigationMenuList class="flex-wrap">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent class="px-0 py-1">
          <div class="grid gap-3 divide-y p-4 sm:w-[500px] md:w-[600px] lg:w-[900px] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div class="pb-3 lg:col-span-2 lg:pe-2 lg:pb-0">
              <h6 class="pl-2.5 font-semibold text-muted-foreground text-sm uppercase">
                Capabilities
              </h6>
              <ul class="mt-2.5 grid gap-3 sm:grid-cols-2">
                <ListItem v-for="component in components"
                  :href="component.href"
                  :icon="component.icon"
                  :key="component.title"
                  :title="component.title"
                >
                  {{ component.description }}
                </ListItem>
              </ul>
            </div>

            <div class="lg:pl-4">
              <h6 class="pl-2.5 font-semibold text-muted-foreground text-sm uppercase">
                Product & Features
              </h6>
              <ul class="mt-2.5 grid gap-3">
                <ListItem v-for="component in components.slice(0, 3)"
                  :href="component.href"
                  :icon="component.icon"
                  :key="component.title"
                  :title="component.title"
                >
                  {{ component.description }}
                </ListItem>
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
        <NavigationMenuContent class="p-4">
          <h6 class="pl-2.5 font-semibold text-muted-foreground text-sm uppercase">
            Solutions
          </h6>
          <ul class="mt-2.5 grid gap-3 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <ListItem v-for="component in components"
              :href="component.href"
              :icon="component.icon"
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
          <a href="#">Developers</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
