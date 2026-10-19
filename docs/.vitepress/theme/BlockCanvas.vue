<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from 'reka-ui'

/**
 * Cara isinya diletakkan di kanvas.
 *
 * - tanpa `layout`: block — halaman utuh yang mengatur dirinya sendiri.
 * - `component`: varian — satu komponen kecil, dipusatkan di tengah jendela.
 * - `chart`: grafik — dipusatkan juga, tapi diberi lebar: kartu grafik
 *   mengikuti lebar wadahnya, dan di tengah flex tanpa lebar ia mengerut jadi
 *   selebar judulnya. Dibatasi `max-w-3xl` supaya di layar lebar tingginya
 *   tidak melampaui jendela.
 * - `hook`: demo composable — dipusatkan di atas kisi titik halus, latar
 *   "meja kerja" yang membedakan demonya dari halaman tanpa menyainginya.
 */
defineProps<{ layout?: 'component' | 'chart' | 'hook' }>()

/**
 * Penomor id sendiri, dimulai dari nol tiap halaman.
 *
 * Reka UI memberi id otomatis pada komponen yang butuh menghubungkan label ke
 * kontrolnya. Penomornya global dan tidak pernah disetel ulang, jadi saat
 * VitePress merender seluruh situs dalam satu proses Node, halaman kesekian
 * mulai dari angka yang sudah tinggi — sementara di peramban halaman itu berdiri
 * sendiri dan mulai dari nol. Hasilnya `reka-tabs-v-12` di HTML statis dan
 * `reka-tabs-v-13` setelah dihidrasi.
 *
 * Vue menyebut selisih semacam ini "check-only": tidak ada yang digambar ulang,
 * jadi tidak ada yang terlihat rusak. Tetap saja itu peringatan yang muncul di
 * console pembaca, dan yang lebih penting, ia menenggelamkan ketidakcocokan
 * sungguhan di antara derau. Penomor ini hidup di dalam satu komponen, jadi ia
 * lahir dan mati bersama halamannya — sama di kedua sisi.
 */
let counter = 0
function pageId() {
  counter += 1
  return `kliping-${counter}`
}

/**
 * Pembungkus halaman block. Block-nya sendiri diimpor halamannya masing-masing.
 *
 * Dulu komponen ini yang mencari block-nya, lewat `import.meta.glob` dengan
 * `eager: true`. Karena ia terdaftar global di tema, satu baris itu menyeret
 * seluruh 34 block beserta pohon komponennya ke dalam chunk yang dipakai
 * *setiap* halaman — termasuk halaman yang tidak menampilkan block sama sekali.
 * Build-nya menyentuh 4 GB dan Cloudflare menghentikannya di tengah jalan.
 *
 * Sekarang tiap halaman block mengimpor block-nya sendiri lewat `<script setup>`,
 * jadi tiap potongan bundel cuma memuat satu block. Yang tersisa di sini tinggal
 * providernya — halaman block memakai `layout: false`, jadi ia melewati kerangka
 * tema dan tidak ikut mendapat provider yang biasanya dipasang di sana. Tanpa
 * ini, block yang memakai tooltip (sidebar yang terlipat, misalnya) kehilangan
 * konteksnya.
 */
</script>

<template>
  <ConfigProvider :use-id="pageId">
    <TooltipProvider>
      <div
        v-if="layout"
        class="flex min-h-svh items-center justify-center bg-background p-6 text-foreground sm:p-10"
        :class="layout === 'hook' && 'kliping-canvas-dots'"
      >
        <div :class="layout === 'chart' ? 'w-full max-w-3xl' : 'flex w-full justify-center'">
          <slot />
        </div>
      </div>
      <slot v-else />
    </TooltipProvider>
  </ConfigProvider>
</template>
