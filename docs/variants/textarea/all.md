---
title: Textarea
description: "Tujuh kotak teks: label, keterangan bantu, tinggi, dan yang nilainya dipegang halaman."
layout: page
---

<script setup>
import Textarea01 from '@/variants/textarea/textarea-01.vue'
import Textarea02 from '@/variants/textarea/textarea-02.vue'
import Textarea03 from '@/variants/textarea/textarea-03.vue'
import Textarea04 from '@/variants/textarea/textarea-04.vue'
import Textarea05 from '@/variants/textarea/textarea-05.vue'
import Textarea06 from '@/variants/textarea/textarea-06.vue'
import Textarea07 from '@/variants/textarea/textarea-07.vue'
</script>

<VariantPage>

<VariantItem name="textarea-01" description="Kotak teks bawaan."><Textarea01 /></VariantItem>

<VariantItem name="textarea-02" description="Berlatar abu tanpa bayangan."><Textarea02 /></VariantItem>

<VariantItem name="textarea-03" description="Dimatikan, tidak bisa diisi."><Textarea03 /></VariantItem>

<VariantItem name="textarea-04" description="Dengan label di atasnya."><Textarea04 /></VariantItem>

<VariantItem name="textarea-05" description="Delapan baris, lebih tinggi dari bawaannya."><Textarea05 /></VariantItem>

<VariantItem name="textarea-06" description="Ada keterangan bantu di bawahnya."><Textarea06 /></VariantItem>

<VariantItem name="textarea-07" description="Nilainya dipegang halaman, bukan komponennya sendiri."><Textarea07 /></VariantItem>

</VariantPage>
