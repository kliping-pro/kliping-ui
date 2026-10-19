---
title: Navigation Menu
description: Kumpulan tautan untuk menavigasi situs.
component: true
links:
  doc: https://reka-ui.com/docs/components/navigation-menu
  api: https://reka-ui.com/docs/components/navigation-menu#api-reference
---

<ComponentPreview name="NavigationMenuDemo" class="[&_.preview]:!items-start [&_.preview]:p-4 [&_.preview]:pt-8 md:[&_.preview]:pt-16" />


## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add navigation-menu
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Pasang dependensi berikut:

```bash
npm install reka-ui
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/navigation-menu) ke project Anda.

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda.

</div>

</Steps>

</TabItem>

</Tabs>

## Usage

```vue:line-numbers
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

<!--@include: ./_api/navigation-menu.md-->
