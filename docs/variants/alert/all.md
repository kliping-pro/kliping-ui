---
title: Alert
description: "Sepuluh nada peringatan, dari yang sekadar memberi tahu sampai yang menghentikan langkah."
layout: page
---

<script setup>
import Alert01 from '@/variants/alert/alert-01.vue'
import Alert02 from '@/variants/alert/alert-02.vue'
import Alert03 from '@/variants/alert/alert-03.vue'
import Alert04 from '@/variants/alert/alert-04.vue'
import Alert05 from '@/variants/alert/alert-05.vue'
import Alert06 from '@/variants/alert/alert-06.vue'
import Alert07 from '@/variants/alert/alert-07.vue'
import Alert08 from '@/variants/alert/alert-08.vue'
import Alert09 from '@/variants/alert/alert-09.vue'
import Alert10 from '@/variants/alert/alert-10.vue'
</script>

<VariantPage>

<VariantItem name="alert-01" description="Peringatan bawaan: ikon, judul, dan satu baris keterangan."><Alert01 /></VariantItem>

<VariantItem name="alert-02" description="Nada merusak, untuk kabar yang gagal."><Alert02 /></VariantItem>

<VariantItem name="alert-03" description="Nada hijau, untuk yang berhasil."><Alert03 /></VariantItem>

<VariantItem name="alert-04" description="Nada kuning, untuk yang perlu dipertimbangkan dulu."><Alert04 /></VariantItem>

<VariantItem name="alert-05" description="Nada biru langit, untuk kabar yang sekadar memberi tahu."><Alert05 /></VariantItem>

<VariantItem name="alert-06" description="Berlatar abu, tanpa warna nada apa pun."><Alert06 /></VariantItem>

<VariantItem name="alert-07" description="Latar berwarna tanpa garis tepi, empat nada sekaligus."><Alert07 /></VariantItem>

<VariantItem name="alert-08" description="Latar berwarna beserta garis tepi senadanya."><Alert08 /></VariantItem>

<VariantItem name="alert-09" description="Garis tebal di tepi kiri, tanpa sudut membulat."><Alert09 /></VariantItem>

<VariantItem name="alert-10" description="Ada tombol silang; menutupnya menyisakan tautan untuk membukanya lagi."><Alert10 /></VariantItem>

</VariantPage>
