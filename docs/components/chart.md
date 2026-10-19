---
title: Chart
description: Grafik yang rapi, dibangun memakai Unovis. Tinggal salin dan tempel ke aplikasi Anda.
component: true
---

<ComponentPreview name="ChartBarInteractive" class="theme-blue [&_.preview]:h-auto [&_.preview]:p-0 [&_.preview]:lg:min-h-[404px] [&_.preview>div]:w-full [&_.preview>div]:border-none [&_.preview>div]:shadow-none" />


Inilah **Charts** — sekumpulan komponen grafik yang bisa Anda salin dan tempel ke aplikasi Anda.

Grafiknya dirancang agar langsung enak dilihat sejak awal, menyatu dengan komponen lain, dan sepenuhnya bisa disesuaikan dengan kebutuhan project Anda.

[Jelajahi koleksi grafiknya](/charts).

## Components

Di baliknya kami memakai [Unovis](https://unovis.dev/).

Komponen `chart` dirancang dengan prinsip komposisi. **Anda membangun grafik memakai komponen Unovis, lalu menambahkan komponen kustom seperti `ChartTooltip` hanya saat dan di tempat Anda membutuhkannya.**

```vue:line-numbers
<script setup lang="ts">
import { VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
</script>

<template>
  <ChartContainer :config="chartConfig">
    <VisXYContainer :data="data">
      <VisGroupedBar :x="(d) => d.month" :y="(d) => d.value" />
      <ChartTooltip :template="componentToString(chartConfig, ChartTooltipContent)" />
    </VisXYContainer>
  </ChartContainer>
</template>
```

Kami tidak membungkus Unovis. Artinya Anda tidak terkunci dalam sebuah abstraksi. Saat Unovis merilis versi baru, Anda bisa mengikuti panduan pembaruan resminya.

**Komponennya milik Anda.**

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add chart
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Pasang dependensi berikut

```bash
npm install @unovis/ts @unovis/vue
```

</div>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/chart) into your project

</div>

<div class="kliping-step">

Sesuaikan path import dengan struktur project Anda

</div>

<div class="kliping-step">

Tambahkan warna-warna berikut ke file CSS Anda

```css
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}
```

</div>

</Steps>

</TabItem>

</Tabs>

## Usage

```vue:line-numbers
<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'

const chartData = [
  { date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
  { date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
  { date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
];
type Data = (typeof chartData)[number]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
</script>
<template>
  <ChartContainer :config="chartConfig" class="min-h-[400px] w-full">
    <VisXYContainer :data="chartData">
      <VisGroupedBar
        :x="(d: Data) => d.date"
        :y="[(d: Data) => d.desktop, (d: Data) => d.mobile]"
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
      <ChartTooltip />
      <ChartCrosshair
        :template="
          componentToString(chartConfig, ChartTooltipContent, {
            labelFormatter(d) {
              return new Date(d).toLocaleDateString('en-US', {
                month: 'long',
              });
            },
          })
        "
        :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
      />
    </VisXYContainer>
  </ChartContainer>
</template>
```

## Grafik Pertama Anda

Mari membangun grafik pertama Anda. Kita akan membuat grafik batang, lalu menambahkan grid, sumbu, tooltip, dan legenda.
<Steps>

<div class="kliping-step">

Mulai dengan mendefinisikan data Anda

  Data berikut mewakili jumlah pengguna desktop dan mobile per bulan.

  ```ts:line-numbers
  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ]
  ```

</div>

<div class="kliping-step">

Definisikan config grafiknya

  Config grafik menyimpan pengaturan grafik Anda. Di sinilah Anda menaruh teks yang dibaca manusia, seperti label, ikon, dan token warna untuk theming.

  ```ts:line-numbers
  import type { ChartConfig } from '@/components/ui/chart'

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig
  ```

</div>

<div class="kliping-step">

Susun grafik Anda

  Sekarang Anda bisa menyusun grafiknya memakai komponen Unovis.


<ComponentSource name="ChartBarDemo" title="components/ExampleChart.vue" />

<ComponentPreview name="ChartBarDemo" class="[&_.preview]:min-h-[250px] [&_.preview]:p-4" />

</div>

</Steps>
### Tambahkan Sumbu

Untuk menambahkan sumbu ke grafik, kita pakai komponen `VisAxis`.
<Steps>

<div class="kliping-step">

Import komponen `VisAxis`

  ```vue:line-numbers
  import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
  ```

</div>

<div class="kliping-step">

Tambahkan komponen `VisAxis` ke grafik Anda

  ```vue:line-numbers
  <template>
    <VisAxis
      type="x"
      :x="(d: Data) => d.date"
      :tick-line="false"
      :domain-line="false"
      :grid-line="false"
      :tick-format="(d: number) => {
        const date = new Date(d)
        return date.toLocaleDateString('en-US', {
          month: 'short',
        })
      }"
      :tick-values="chartData.map(d => d.date)"
    />
    <VisAxis
      type="y"
      :tick-format="(d: number) => ''"
      :tick-line="false"
      :domain-line="false"
      :grid-line="true"
    />
  </template>
  ```

<ComponentPreview name="ChartBarDemoAxis" class="[&_.preview]:min-h-[250px] [&_.preview]:p-4" />

</div>

</Steps>
### Tambahkan Tooltip

Untuk menambahkan tooltip, kita pakai komponen `ChartTooltip` dan `ChartTooltipContent` dari `chart`.
<Steps>

<div class="kliping-step">

Import komponen `ChartTooltip` dan `ChartTooltipContent`

  ```ts
  import { ChartTooltip, ChartTooltipContent, componentToString } from '@/components/ui/chart'
  ```

</div>

<div class="kliping-step">

Tambahkan komponen-komponen itu ke grafik Anda

  ```vue:line-numbers
  <ChartTooltip />

  <ChartCrosshair :template="componentToString(chartConfig, ChartTooltipContent)" />
  ```

<ComponentPreview name="ChartBarDemoTooltip" class="[&_.preview]:min-h-[250px] [&_.preview]:p-4" />


  Arahkan kursor untuk melihat tooltip-nya. Mudah, kan? Cukup dua komponen, dan tooltipnya sudah rapi.

</div>

</Steps>
### Tambahkan Legenda

Untuk legenda caranya sama. Kita pakai komponen `ChartLegend` dan `ChartLegendContent` dari `chart`.
<Steps>

<div class="kliping-step">

Import komponen `ChartLegendContent`.

  ```ts
  import { ChartLegendContent } from '@/components/ui/chart'
  ```

</div>

<div class="kliping-step">

Tambahkan komponen-komponen itu ke grafik Anda.

  ```vue:line-numbers{4}
  <template>
    <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
      <VisXYContainer :data="chartData" />
      <ChartLegendContent />
    </ChartContainer>
  </template>
  ```

<ComponentPreview name="ChartBarDemoLegend" class="[&_.preview]:min-h-[250px] [&_.preview]:p-4" />

</div>

</Steps>
Selesai. Grafik pertama Anda sudah jadi! Berikutnya apa?

- [Tema dan Warna](/components/chart#theming)
- [Tooltip](/components/chart#tooltip)
- [Legend](/components/chart#legend)

## Config Grafik

Config grafik adalah tempat Anda mendefinisikan label, ikon, dan warna sebuah grafik.

Ia sengaja dipisahkan dari data grafiknya.

Dengan begitu config dan token warna bisa Anda pakai bersama antar grafik. Ia juga tetap bekerja sendiri kalau data atau token warna Anda tersimpan di tempat lain atau berformat berbeda.

```vue:line-numbers
<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { Monitor } from '@lucide/vue'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: 'var(--chart-1)',
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: 'var(--chart-1)',
      dark: 'var(--chart-2)',
    },
  },
} satisfies ChartConfig
</script>
```

## Theming

Charts sudah mendukung theming sejak awal. Anda bisa memakai CSS variable (disarankan) atau nilai warna dalam format apa pun, seperti hex, hsl, atau oklch.

### CSS Variables
<Steps>

<div class="kliping-step">

Definisikan warna Anda di file CSS

  ```css:line-numbers
  @layer base {
    :root {
      --chart-1: oklch(0.646 0.222 41.116);
      --chart-2: oklch(0.6 0.118 184.704);
    }

    .dark {
      --chart-1: oklch(0.488 0.243 264.376);
      --chart-2: oklch(0.696 0.17 162.48);
    }
  }
  ```

</div>

<div class="kliping-step">

Tambahkan warnanya ke `chartConfig` Anda

  ```ts:line-numbers{4,8}
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig
  ```

</div>

</Steps>
### hex, hsl or oklch

Warna juga bisa Anda definisikan langsung di config grafik, dengan format warna yang Anda sukai.

```ts:line-numbers
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig
```

### Memakai Warna

Untuk memakai warna tema di grafik Anda, rujuk warnanya dengan format `var(--color-KEY)`.

#### Komponen

```vue:line-numbers
<VisGroupedBar
  :x="(d) => d.month"
  :y="(d) => d.desktop"
  color="var(--color-desktop)"
/>
```

#### Data Grafik

```ts:line-numbers
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]
```

## Tooltip

Tooltip grafik memuat label, nama, indikator, dan nilai. Anda bisa memadukannya sesuai kebutuhan.

Masing-masing bisa dinyalakan atau dimatikan lewat prop `hideLabel` dan `hideIndicator`, sedangkan style indikatornya diatur lewat prop `indicator`.

Pakai `labelKey` dan `nameKey` kalau label serta nama tooltip Anda memakai key yang berbeda.

Chart menyertakan komponen `ChartTooltip` dan `ChartTooltipContent`. Keduanya bisa Anda pakai untuk menambahkan tooltip kustom ke grafik.

```ts:line-numbers
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
```

```vue:line-numbers
<template>
  <ChartTooltip />
  <ChartCrosshair
    :template="componentToString(chartConfig, ChartTooltipContent)"
  />
</template>
```

### Props

Pakai prop berikut untuk menyesuaikan tooltip.

| Prop            | Type                     | Description                                  |
| :-------------- | :----------------------- | :------------------------------------------- |
| `labelKey`      | string                   | The config or data key to use for the label. |
| `nameKey`       | string                   | The config or data key to use for the name.  |
| `indicator`     | `dot` `line` or `dashed` | The indicator style for the tooltip.         |
| `hideLabel`     | boolean                  | Whether to hide the label.                   |
| `hideIndicator` | boolean                  | Whether to hide the indicator.               |

### Warna

Warnanya otomatis diambil dari config grafik.

### Kustom

Untuk memakai key kustom pada label dan nama tooltip, gunakan prop `labelKey` dan `nameKey`.

```ts:line-numbers
const chartData = [
  { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]

const chartConfig = {
  visitors: {
    label: 'Total Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig
```

```vue:line-numbers
<template>
  <ChartCrosshair
    :template="componentToString(chartConfig, ChartTooltipContent, {
      labelKey: 'visitors',
      nameKey: 'browser',
    })"
  />
</template>
```

Dengan begitu labelnya memakai `Total Visitors`, sedangkan nama tooltip-nya `Chrome` dan `Safari`.

## Legend

Pakai komponen `<ChartLegendContent>` untuk menambahkan legenda ke grafik Anda.

```ts
import { ChartLegendContent } from '@/components/ui/chart'
```

```vue
<template>
  <ChartLegendContent />
</template>
```

### Warna

Warnanya otomatis diambil dari config grafik.

### Kustom

Untuk memakai key kustom pada nama legenda, gunakan prop `nameKey`.

```tsx:line-numbers
const chartData = [
  { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
]

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig
```

```vue
<template>
  <ChartLegendContent name-key="browser" />
</template>
```

Dengan begitu nama legendanya menjadi `Chrome` dan `Safari`.

<!--@include: ./_api/chart.md-->
