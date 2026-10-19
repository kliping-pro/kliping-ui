---
title: Collapsible
description: "Empat bagian yang bisa dilipat: satu blok, daftar yang dipotong, pohon berkas, dan panel penyaring."
layout: page
---

<script setup>
import Collapsible01 from '@/variants/collapsible/collapsible-01.vue'
import Collapsible02 from '@/variants/collapsible/collapsible-02.vue'
import Collapsible03 from '@/variants/collapsible/collapsible-03.vue'
import Collapsible04 from '@/variants/collapsible/collapsible-04.vue'
</script>

<VariantPage>

<VariantItem name="collapsible-01" description="Satu bagian yang bisa dilipat, dipicu tombol ikon di sampingnya."><Collapsible01 /></VariantItem>

<VariantItem name="collapsible-02" description="Daftar yang dipotong, dengan tombol tampilkan lebih banyak."><Collapsible02 /></VariantItem>

<VariantItem name="collapsible-03" description="Pohon berkas yang tiap foldernya bisa dilipat."><Collapsible03 /></VariantItem>

<VariantItem name="collapsible-04" description="Panel penyaring toko: rentang harga, kategori, dan bintang."><Collapsible04 /></VariantItem>

</VariantPage>
