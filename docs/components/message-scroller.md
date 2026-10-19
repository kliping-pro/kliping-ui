---
title: Message Scroller
description: "Wadah gulir untuk transkrip percakapan: menahan posisi giliran bicara, mengikuti balasan yang mengalir, memulihkan riwayat yang disisipkan di atas, dan melompat ke pesan tertentu."
component: true
---

<ComponentPreview name="MessageScrollerDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

## MessageScroller

Area gulir chat yang baik harus mengurus banyak hal sekaligus: menempel di ujung terbaru selagi balasan mengalir, tapi tidak melawan pembaca yang sedang menggulir ke atas; menambatkan tiap giliran bicara baru di dekat bagian atas dengan sedikit sisa percakapan sebelumnya; mempertahankan posisi saat riwayat lama dimuat di atasnya; serta menyediakan perintah untuk melompat ke mana pun di dalam utas. `MessageScroller` menangani bagian-bagian sulit itu, jadi daftar pesan Anda tidak perlu memikirkannya.

Ia **tidak** mengurus pesan, state AI, transport, atau model Anda — ia sekadar wadah gulir headless yang Anda bungkuskan pada baris-baris buatan Anda sendiri.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add message-scroller
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/message-scroller) ke project Anda.

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
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'
</script>

<template>
  <MessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem
            v-for="message in messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <!-- Message / Bubble / Marker goes here -->
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton direction="end" />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```

Provider-nya harus punya tinggi yang dibatasi (atau induk yang tingginya terbatas) supaya area tampilannya bisa digulir.

## Composition

```text
MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem
    └── MessageScrollerButton
```

## Konsep Dasar

### Menambatkan Giliran Bicara

Giliran bicara adalah bagian percakapan yang memulai pertukaran baru — biasanya pesan pengguna beserta balasan asisten sesudahnya. *Anchor* adalah baris yang dianggap sebagai awal giliran tersebut. Tandai baris itu dengan `scrollAnchor`. Saat anchor baru ditambahkan, area tampilan memindahkannya ke dekat bagian atas dan menyisakan sedikit item sebelumnya di atasnya, supaya giliran baru itu tidak terasa terputus dari konteksnya.

```vue
<MessageScrollerItem
  :message-id="message.id"
  :scroll-anchor="message.role === 'user'"
>
  <!-- ... -->
</MessageScrollerItem>
```

Scroll anchor tidak terikat pada peran pesan. Baris apa pun bisa Anda jadikan anchor: pesan pengguna, penanda sistem, peristiwa serah terima, atau apa pun yang memulai giliran bicara yang bermakna.

<ComponentPreview name="MessageScrollerAnchoringDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Percakapan Grup

Di percakapan grup, batas giliran bicara sering berupa pesan yang meminta model membalas, atau penanda seperti "Marcus bergabung ke percakapan". Indikator "sedang mengetik" dan kontrol riwayat biasanya tidak perlu jadi anchor. Karena penambatan tidak bergantung peran, penanda bisa dijadikan anchor semudah pesan biasa.

<ComponentPreview name="MessageScrollerGroupChatDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Menjaga Konteks Tetap Terlihat

Saat giliran bicara baru dimulai, percakapannya harus tetap terasa menyambung. `scrollPreviousItemPeek` menyisakan sepotong item sebelumnya tetap terlihat di atas anchor, supaya pembaca tidak merasa percakapannya dimulai ulang di halaman kosong.

<ComponentPreview name="MessageScrollerPreviousContextDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Mengikuti Ujung Terbaru

Saat pembaca berada di ujung terbaru, `autoScroll` menjaga balasan yang mengalir tetap terlihat selagi bertambah panjang. Begitu pembaca menggulir menjauh — lewat scroll mouse, sentuhan, keyboard, atau menyeret scrollbar — tampilannya dilepas, jadi potongan baru tetap datang tanpa menggeser posisi baca. `autoScroll` bekerja berdampingan dengan penambatan giliran: saat giliran baru tertambat di dekat atas, tampilannya diam sementara balasan mengalir ke ruang di bawahnya.

<ComponentPreview name="MessageScrollerStreamingDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Membuka Utas Tersimpan

Membuka kembali utas tersimpan tepat di ujung paling akhir sering membuat pembaca kehilangan konteks. Nilai bawaan yang lebih baik adalah `"last-anchor"`: tampilkan giliran bicara bermakna yang terakhir — misalnya pesan terbaru pengguna — beserta balasannya di bawahnya.

<ComponentPreview name="MessageScrollerOpeningPositionDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Memuat Pesan Sebelumnya

Memuat pesan lama tidak boleh menggeser percakapan yang sedang dibaca. Saat baris lama disisipkan di atas transkrip, `MessageScrollerViewport` mempertahankan baris yang terlihat supaya posisi baca tidak berubah selagi riwayat dimuat di atasnya. Perilaku ini aktif secara bawaan lewat `preserveScrollOnPrepend`.

<ComponentPreview name="MessageScrollerLoadHistoryDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Menganimasikan Pesan Baru

Pola yang umum di aplikasi chat adalah menganimasikan pesan pengguna saat dikirim, lalu membiarkan balasan asisten mengalir ke baris biasa di bawahnya. Pertahankan `messageId` dan `scrollAnchor` pada item yang dianimasikan, dan pakai transform serta opacity untuk animasi masuknya — hindari menganimasikan height, margin, atau padding karena bisa berbenturan dengan penempatan posisi oleh scroller.

<ComponentPreview name="MessageScrollerAnimationDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Melompat ke Pesan Tertentu

Hasil pencarian, permalink, daftar isi, dan tombol toolbar sering perlu menggerakkan transkrip dari luar daftar pesan. Pakai `useMessageScroller` untuk kontrol semacam itu — composable-nya membaca dari `MessageScrollerProvider`, jadi bisa dipakai di komponen mana pun di dalam provider tersebut.

```vue
<script setup lang="ts">
import { useMessageScroller } from '@/components/ui/message-scroller'

const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
</script>
```

<ComponentPreview name="MessageScrollerCommandsDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Melacak Posisi Baca Pengguna

Pakai `useMessageScrollerVisibility` untuk melacak posisi baca pengguna — misalnya daftar isi atau menu lompat yang menyorot giliran bicara yang sedang tertambat. `currentAnchorId` menjawab "saya sedang di mana" dan nilainya bertahan meski anchor itu sudah tergulir ke atas layar; `visibleMessageIds` menjawab "apa yang sedang tampil", sesuai urutan dokumen.

<ComponentPreview name="MessageScrollerVisibilityDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

### Membaca State Gulir

Pakai `useMessageScrollerScrollable` kalau Anda butuh state gulir di JavaScript, misalnya untuk indikator status atau tombol "lompat ke terbaru" buatan sendiri. Ia melaporkan ke arah tepi mana saja area tampilan masih bisa digulir.

<ComponentPreview name="MessageScrollerScrollableDemo" class="rounded-[34px] sm:rounded-4xl" previewClass="h-auto theme-green bg-surface dark:bg-background p-4 min-[480px]:p-8 min-[560px]:p-10 sm:px-10 sm:py-16" />

<!--@include: ./_api/message-scroller.md#requirements-->

<!--@include: ./_api/message-scroller.md#anatomy-->

## API Reference

### MessageScrollerProvider

Memegang state dan perilaku gulir. Sediakan lewat `provide`/`inject` supaya composable gulirnya bisa dipakai komponen turunan.

<!--@include: ./_api/message-scroller.md#MessageScrollerProvider-->

### MessageScrollerViewport

<!--@include: ./_api/message-scroller.md#MessageScrollerViewport-->

Ditampilkan sebagai wadah gulir bawaan browser dengan `role="region"`, `aria-label="Messages"`, dan bisa di-focus (`tabindex="0"`).

### MessageScrollerItem

<!--@include: ./_api/message-scroller.md#MessageScrollerItem-->

### MessageScrollerButton

<!--@include: ./_api/message-scroller.md#MessageScrollerButton-->

Menyediakan `data-active` untuk keperluan style, dan menjadi `inert` dengan `tabindex="-1"` saat tidak ada lagi yang bisa digulir.

### Composable

#### useMessageScroller()

```ts
const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
```

- `scrollToMessage(id, options?)` — menggulir ke item dengan `messageId` yang cocok. Mengembalikan `true` kalau berhasil ditangani (diantre kalau itemnya belum ter-mount), dan `false` kalau id-nya tidak ditemukan setelah semua baris ter-mount.
- `scrollToEnd(options?)` / `scrollToStart(options?)` — menggulir ke ujung terbaru atau ke bagian paling atas.

#### useMessageScrollerVisibility()

```ts
const visibility = useMessageScrollerVisibility()
// visibility.value.currentAnchorId, visibility.value.visibleMessageIds
```

Pelacakan hanya berjalan selama ada yang berlangganan, dan tiap baris perlu `messageId` supaya ikut terlacak.

#### useMessageScrollerScrollable()

```ts
const scrollable = useMessageScrollerScrollable()
// scrollable.value.start, scrollable.value.end
```

Melaporkan ke arah tepi mana saja area tampilan masih bisa digulir. Untuk men-style scroller-nya sendiri, lebih baik pakai atribut `data-scrollable`.

### MessageScroller

<!--@include: ./_api/message-scroller.md#MessageScroller-->

### MessageScrollerContent

<!--@include: ./_api/message-scroller.md#MessageScrollerContent-->

<!--@include: ./_api/message-scroller.md#css-variables-->
