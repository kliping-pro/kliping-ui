---
title: Questionnaire
description: Kuesioner bertahap dengan pertanyaan pilihan tunggal, pilihan ganda, isian bebas, dan pertanyaan yang boleh dilewati.
component: true
new: true
---

<ComponentPreview name="QuestionnaireDemo" align="end" previewClass="min-h-[560px] p-4 sm:p-8" />

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

```bash
npx kliping@latest add questionnaire
```

</TabItem>

<TabItem value="manual" label="Manual">

<Steps>

<div class="kliping-step">

Salin dan tempel [kode sumber di GitHub](https://github.com/kliping-pro/kliping-ui/tree/main/src/components/ui/questionnaire) ke project Anda.

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
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'

const items = [
  { name: 'direction', required: true },
  { name: 'timing', required: true },
]

function handleSubmit(event: Event) {
  event.preventDefault()

  const answers = new FormData(event.target as HTMLFormElement)
  console.log(Object.fromEntries(answers))
}
</script>

<template>
  <Questionnaire :items="items" @submit="handleSubmit">
    <QuestionnaireProgress />

    <QuestionnaireItem name="direction" required>
      <QuestionnaireTitle>What should the agent build next?</QuestionnaireTitle>
      <QuestionnaireDescription>Choose a direction.</QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="tool-calls">Tool call timeline</QuestionnaireChoice>
        <QuestionnaireChoice value="approvals">Approval checkpoints</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="timing" required>
      <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
        <QuestionnaireChoice value="backlog">Add it to the backlog</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext />
      <QuestionnaireSubmit />
    </QuestionnaireActions>
  </Questionnaire>
</template>
```

## Composition

Susunan berikut adalah cara membangun sebuah questionnaire:

```text
Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   │   └── QuestionnaireChoiceDescription
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit
```

`Questionnaire` menghasilkan `<form>` sungguhan, dan tiap itemnya menghasilkan `<fieldset>` beserta `<legend>`. Jawabannya terkirim lewat `FormData`, jadi Anda tidak perlu state tambahan.

## Render di Sisi Server

Isi prop `items` supaya item aktif, progres, tombol aksi, dan pintasan jawaban ikut dirender di server. Tanpa itu, questionnaire baru mengetahui urutannya setelah semua item ter-mount di klien.

## Features

- Satu pertanyaan dalam satu waktu, dengan progres, navigasi, dan validasi yang sudah ditangani otomatis.
- Jawaban pilihan tunggal, pilihan ganda, isian bebas, dan pertanyaan yang sengaja dilewati.
- Pintasan keyboard untuk memilih jawaban, plus navigasi antar pertanyaan dan jawaban lewat tombol panah.
- Prop `items` yang deklaratif untuk mengatur urutan, item bersyarat, dan penetapan pintasan yang konsisten.
- Navigasi yang dikendalikan lewat `v-model:item` untuk alur validasi buatan sendiri.
- Reset form bawaan browser mengembalikan jawaban ke nilai yang Anda tandai sebagai bawaan.

## Examples

### Pilihan Ganda

Pakai `multiple` untuk pertanyaan yang menerima lebih dari satu jawaban tetap.

<ComponentPreview name="QuestionnaireMultipleDemo" align="end" previewClass="min-h-[420px] p-4 sm:p-8" />

### Jawaban Bebas

Padukan `QuestionnaireInput` dengan pilihan tetap kalau pengguna boleh mengisi jawaban lain.

<ComponentPreview name="QuestionnaireFreeformDemo" align="end" previewClass="min-h-[420px] p-4 sm:p-8" />

### Melewati Pertanyaan

Tambahkan `QuestionnaireSkip` kalau sebuah pertanyaan opsional boleh sengaja dikosongkan.

<ComponentPreview name="QuestionnaireSkipDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### Pintasan Keyboard

Tetapkan tombol huruf atau angka untuk tiap jawaban lewat `shortcuts`. Deklarasikan `choices` pada `items` supaya tombolnya tetap konsisten berapa pun urutan tampilnya.

<ComponentPreview name="QuestionnaireShortcutsDemo" align="end" previewClass="min-h-[480px] p-4 sm:p-8" />

### Validasi Buatan Sendiri

Padukan navigasi terkendali dengan skema eksternal seperti Zod untuk kembali ke pertanyaan yang belum valid dan menampilkan pesan error-nya.

<ComponentPreview name="QuestionnaireValidationDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

`QuestionnaireError` sudah punya pesan bawaan, jadi tampilkan pesan Anda sendiri hanya kalau memang ada:

```vue:line-numbers
<QuestionnaireError>
  <template v-if="errors.detail">
    {{ errors.detail }}
  </template>
</QuestionnaireError>
```

### Dikendalikan dari Luar

Kendalikan item aktif dari state induk, misalnya untuk kembali ke langkah yang belum valid. Pakai `v-model:item`.

<ComponentPreview name="QuestionnaireControlledDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### Melanjutkan Sesi

Pulihkan item aktif dan jawaban bawaan yang tersimpan, lalu kembalikan perubahan ke keadaan simpanan itu.

<ComponentPreview name="QuestionnaireResumeDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### Pertanyaan Bersyarat

Nonaktifkan pertanyaan yang tidak relevan dengan jawaban pengguna sebelumnya.

<ComponentPreview name="QuestionnaireConditionalDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### State Navigasi

Baca status tiap item untuk menonaktifkan navigasi dan menyesuaikan style tombol aksi. Dengarkan `@update:status` pada item yang ingin Anda pantau.

<ComponentPreview name="QuestionnaireNavigationStateDemo" align="end" previewClass="min-h-[480px] p-4 sm:p-8" />

### Indikator Progres Kustom

Pakai state pada slot progres untuk membuat indikator sendiri. `QuestionnaireProgress` menyediakan `current`, `total`, `first`, dan `last`.

<ComponentPreview name="QuestionnaireProgressDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### Item Beranimasi

Animasikan item yang sedang aktif sementara progres dan navigasinya tetap diam. Item aktif ditandai dengan `data-active`.

<ComponentPreview name="QuestionnaireAnimatedDemo" align="end" previewClass="min-h-[520px] p-4 sm:p-8" />

### Card

Padukan Questionnaire dengan slot Card tanpa mengorbankan makna judul dan keterangan pertanyaannya. Pakai `as-child` untuk menampilkan sebuah bagian sebagai komponen lain:

```vue:line-numbers
<QuestionnaireTitle as-child>
  <CardTitle>What should the agent work on?</CardTitle>
</QuestionnaireTitle>
```

<ComponentPreview name="QuestionnaireCardDemo" align="end" previewClass="min-h-[560px] p-4 sm:p-8" />

`QuestionnaireProgress`, `QuestionnaireTitle`, `QuestionnaireDescription`, `QuestionnaireChoices`, `QuestionnaireError`, `QuestionnaireActions`, dan keempat tombol navigasinya sama-sama menerima `as` dan `as-child`. Memakai `as-child` pada judul akan menggantikan `legend` yang menamai item, sehingga item itu dilabeli oleh judul yang ditampilkan. Judul dan keterangannya tetap mempertahankan id dari anak yang mereka render.

### Dialog

Padukan Questionnaire di dalam Dialog, sementara urusan membatalkan dan menutupnya tetap dipegang komponen induk.

<ComponentPreview name="QuestionnaireDialogDemo" align="end" previewClass="min-h-[320px] p-4 sm:p-8" />

## Navigasi Keyboard

| Key                    | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `Arrow Down`           | Moves focus to the next answer.                                   |
| `Arrow Up`             | Moves focus to the previous answer.                               |
| `Arrow Right`          | Moves to the next question once the current one is answered.      |
| `Arrow Left`           | Moves to the previous question.                                   |
| `Enter`                | Confirms the focused answer and moves on, or submits on the last question. |
| `Meta+Enter` / `Ctrl+Enter` | Confirms the active question from anywhere in the form.      |
| `A` – `Z` / `1` – `9`  | Selects the matching choice when `shortcuts` is set.              |

## Accessibility

`QuestionnaireItem` menghasilkan `fieldset` beserta `legend`, jadi tiap pertanyaan dibacakan bersama jawabannya. Keterangan dan pesan error dikaitkan ke item lewat `aria-describedby`, dan item yang belum valid menyertakan `aria-invalid`.

`QuestionnaireProgress` menghasilkan `progressbar` bernama yang membacakan pertanyaan saat ini. Item yang tidak aktif diberi `hidden` dan `inert`, jadi tidak ikut urutan Tab maupun pohon aksesibilitas.

Tombol navigasinya adalah tombol sungguhan. `QuestionnaireSubmit` mengirim form, jadi questionnaire tetap bekerja dengan autofill browser dan pengiriman form bawaan.

<!--@include: ./_api/questionnaire.md#requirements-->

<!--@include: ./_api/questionnaire.md#anatomy-->

## API Reference

### Questionnaire

Form terluar. Mengurus item aktif, progres, validasi, dan navigasi keyboard.

<!--@include: ./_api/questionnaire.md#Questionnaire-->

### QuestionnaireProgress

Sebuah `progressbar` yang membacakan pertanyaan aktif. Menyediakan `current`, `total`, `first`, dan `last` ke slot bawaannya.

<!--@include: ./_api/questionnaire.md#QuestionnaireProgress-->

### QuestionnaireItem

Satu pertanyaan, ditampilkan sebagai `fieldset`. Hanya item yang aktif yang terlihat.

<!--@include: ./_api/questionnaire.md#QuestionnaireItem-->

### QuestionnaireTitle

Teks pertanyaannya, ditampilkan sebagai `legend`.

<!--@include: ./_api/questionnaire.md#QuestionnaireTitle-->

### QuestionnaireDescription

Teks bantuan yang dikaitkan ke item lewat `aria-describedby`.

<!--@include: ./_api/questionnaire.md#QuestionnaireDescription-->

### QuestionnaireChoices

Daftar jawaban. Membungkus pilihan-pilihan beserta isian bebas kalau ada.

<!--@include: ./_api/questionnaire.md#QuestionnaireChoices-->

### QuestionnaireChoice

Satu jawaban, ditampilkan sebagai radio atau checkbox tergantung jenis pertanyaannya.

<!--@include: ./_api/questionnaire.md#QuestionnaireChoice-->

### QuestionnaireChoiceDescription

Teks tambahan di dalam sebuah pilihan.

<!--@include: ./_api/questionnaire.md#QuestionnaireChoiceDescription-->

### QuestionnaireInput

Jawaban bebas. Dianggap menjawab pertanyaan selama isiannya tidak kosong, dan dikirim memakai nama item tersebut.

<!--@include: ./_api/questionnaire.md#QuestionnaireInput-->

### QuestionnaireError

Pesan error item. Tersembunyi sampai item itu dinyatakan tidak valid, dan memakai pesan bawaan kalau Anda tidak menyediakannya.

<!--@include: ./_api/questionnaire.md#QuestionnaireError-->

### QuestionnaireActions

Baris tombol navigasi.

<!--@include: ./_api/questionnaire.md#QuestionnaireActions-->

### QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, dan QuestionnaireSubmit

Tombol-tombol navigasi. Masing-masing menyembunyikan diri saat tidak relevan: `QuestionnairePrevious` di item pertama, `QuestionnaireSkip` di item wajib, `QuestionnaireNext` di item terakhir, dan `QuestionnaireSubmit` di semua item selain yang terakhir.

### QuestionnaireNext

<!--@include: ./_api/questionnaire.md#QuestionnaireNext-->

### QuestionnairePrevious

<!--@include: ./_api/questionnaire.md#QuestionnairePrevious-->

### QuestionnaireSkip

<!--@include: ./_api/questionnaire.md#QuestionnaireSkip-->

### QuestionnaireSubmit

<!--@include: ./_api/questionnaire.md#QuestionnaireSubmit-->

<!--@include: ./_api/questionnaire.md#css-variables-->
