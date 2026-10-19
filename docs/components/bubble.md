---
title: Bubble
description: Menampilkan isi percakapan dalam gelembung pesan. Mendukung varian, perataan, pengelompokan, reaksi, dan konten yang bisa dilipat.
component: true
---

<ComponentPreview name="BubbleDemo" previewClass="h-auto theme-blue" />

Komponen `Bubble` menampilkan isi percakapan dalam bingkai. Cocok untuk teks chat, keluaran terstruktur singkat, balasan berkutip, saran, dan reaksi.

Untuk antarmuka chat yang lengkap, pakai komponen [`Message`](/components/message). `Bubble` memang sengaja dibatasi pada badan gelembungnya saja. Avatar, nama, waktu, metadata, dan aksi tingkat pesan diletakkan di [`Message`](/components/message).

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add bubble
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/bubble) ke project Anda.

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
import { Bubble, BubbleContent, BubbleReactions } from '@/components/ui/bubble'
</script>

<template>
  <Bubble>
    <BubbleContent>
      I checked the registry output and removed the stale route.
    </BubbleContent>
    <BubbleReactions>
      <span>👍</span>
    </BubbleReactions>
  </Bubble>
</template>
```

## Composition

Susunan berikut adalah cara membangun sebuah bubble:

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Pakai `BubbleGroup` untuk mengelompokkan bubble berurutan dari pengirim yang sama:

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

## Features

- Tujuh varian tampilan, dari bubble primary yang tegas sampai konten ghost tanpa bingkai.
- Perataan awal dan akhir untuk bubble pengirim dan penerima.
- Reaksi yang menempel di tepi bubble, dengan sisi dan perataan yang bisa diatur.
- Ukuran bubble menyesuaikan isinya, maksimal 80% dari lebar container.
- Konten polimorfik lewat `as` atau `as-child` untuk bubble berupa tautan dan tombol.
- Style tiap bagian bisa disesuaikan lewat prop `class`.

## Examples

### Varian

Pakai `variant` untuk mengubah tampilan bubble.

<ComponentPreview name="BubbleVariantsDemo" previewClass="h-auto theme-blue" />

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

Ukuran bubble menyesuaikan isinya, maksimal 80% dari lebar container. Varian `ghost` melepas batas lebar itu, sehingga teks asisten dan konten kaya bisa memenuhi satu baris penuh.

### Perataan

Pakai `align` pada `Bubble` untuk menaruhnya di sisi awal atau akhir percakapan.

<ComponentPreview name="BubbleAlignmentDemo" previewClass="h-auto theme-blue" />

| align   | Description                                        |
| ------- | -------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

**Catatan:** saat membangun antarmuka chat, `align` biasanya lebih tepat diatur di komponen `Message`. Bubble di dalam `MessageContent` otomatis mengikuti perataan pesannya.

### Bubble Group

Pakai `BubbleGroup` untuk mengelompokkan bubble berurutan dari pengirim yang sama. Perlu dicatat, prop `align` diatur pada komponen `Bubble`, bukan pada `BubbleGroup`.

```text
BubbleGroup
├── Bubble
│   └── BubbleContent
└── Bubble
    └── BubbleContent
```

<ComponentPreview name="BubbleGroupDemo" previewClass="h-auto theme-blue" />

### Tautan dan Tombol

Pakai `as-child` untuk menggabungkan style dan atribut `BubbleContent` ke tautan atau tombol yang Anda taruh di slot bawaannya.

<ComponentPreview name="BubbleLinksAndButtonsDemo" previewClass="h-auto theme-blue" />

```vue:line-numbers
<script setup lang="ts">
import { Bubble, BubbleContent } from '@/components/ui/bubble'
</script>

<template>
  <Bubble variant="muted">
    <BubbleContent as-child>
      <button type="button">Click here</button>
    </BubbleContent>
  </Bubble>
</template>
```

### Reactions

Pakai `BubbleReactions` untuk menampilkan reaksi pada bubble, atau tombol aksi cepat. Posisinya diatur lewat `side` dan `align` — `side="top"` menempelkannya di tepi atas. Karena reaksi menumpuk di tepi bubble, sisakan jarak vertikal antar baris; contoh di bawah memakai `gap` yang lebih besar untuk alasan itu.

<ComponentPreview name="BubbleReactionsDemo" previewClass="h-auto theme-blue" />

### Tampilkan Selengkapnya

Isi bubble yang panjang bisa dipadukan dengan [`Collapsible`](/components/collapsible) agar bisa dibuka dan ditutup. Pakai komponen `CollapsibleTrigger` sebagai pemicunya.

<ComponentPreview name="BubbleCollapsibleDemo" previewClass="h-auto theme-blue" />

### Tooltip

Bungkus bubble dengan [`Tooltip`](/components/tooltip) untuk memunculkan metadata saat di-hover, misalnya kapan pesan itu dibaca.

<ComponentPreview name="BubbleTooltipDemo" previewClass="h-auto theme-blue" />

### Popover

Padukan bubble dengan [`Popover`](/components/popover) untuk memunculkan keterangan tambahan saat diminta, misalnya pesan error lengkap dari aksi yang gagal.

<ComponentPreview name="BubblePopoverDemo" previewClass="h-auto theme-blue" />

## Accessibility

`Bubble` hanya menampilkan badan pesannya. Makna di tingkat percakapan sebaiknya tetap dipegang container di sekelilingnya. Ikuti panduan di bawah ini.

### Memberi Label pada Reaksi

Reaksi ditampilkan sebagai deretan emoji. Pembaca layar membacakan tiap emoji tanpa konteks, dan penghitung seperti `+8` dibaca sebagai "plus delapan". Jadikan deretan itu satu gambar utuh dengan `aria-label` yang jelas supaya dibacakan sekali saja. `role="img"` sekaligus menyembunyikan emoji satu per satu dari teknologi bantu, jadi `aria-hidden` tidak diperlukan.

```vue:line-numbers
<BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 8 more">
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</BubbleReactions>
```

Kalau reaksinya bisa diklik, tampilkan sebagai tombol, dan beri `aria-label` pada tombol yang hanya berupa ikon.

```vue:line-numbers
<BubbleReactions>
  <Button aria-label="Thumbs up" variant="secondary" size="icon-xs">
    <ThumbsUpIcon />
  </Button>
</BubbleReactions>
```

### Bubble yang Interaktif

Kalau bubble bisa diklik, teruskan elemen `<button>` atau `<a>` sungguhan lewat `BubbleContent` dengan `as-child`, supaya bisa di-focus dan punya role yang benar. `BubbleContent` sudah menyediakan cincin focus yang terlihat untuk elemen interaktif, dan nama aksesibelnya diambil dari teks bubble — tidak perlu label tambahan.

```vue:line-numbers
<Bubble variant="muted" align="end">
  <BubbleContent as-child>
    <button type="button" @click="onReply">
      I forgot my password
    </button>
  </BubbleContent>
</Bubble>
```

### Makna yang Tidak Bergantung Warna

Varian bubble menandakan peran dan nada lewat warna. Padukan dengan teks, perataan, atau ikon supaya maknanya tidak bergantung pada warna semata. Untuk bubble `destructive`, jelaskan konteks error-nya di dalam teks pesan, bukan mengandalkan warnanya.

<!--@include: ./_api/bubble.md#requirements-->

<!--@include: ./_api/bubble.md#anatomy-->

## API Reference

Semua bagian Bubble menghasilkan `<div>` secara bawaan. Pakai `as` untuk memilih elemen lain, atau `as-child` untuk menggabungkan atribut dan style komponen ke satu elemen atau komponen di dalam slot bawaannya.

### Bubble

Pembungkus terluar bubble.

<!--@include: ./_api/bubble.md#Bubble-->

### BubbleContent

Pembungkus isi bubble.

<!--@include: ./_api/bubble.md#BubbleContent-->

### BubbleReactions

Menampilkan reaksi yang menumpuk di tepi bubble.

<!--@include: ./_api/bubble.md#BubbleReactions-->

### BubbleGroup

Mengelompokkan bubble berurutan dari pengirim yang sama.

<!--@include: ./_api/bubble.md#BubbleGroup-->

<!--@include: ./_api/bubble.md#css-variables-->
