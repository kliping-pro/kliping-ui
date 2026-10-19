---
title: Tooltip
description: "Tujuh tooltip: arah, panah, jeda muncul, dan yang digambar di luar induknya."
layout: page
---

<script setup>
import Tooltip01 from '@/variants/tooltip/tooltip-01.vue'
import Tooltip02 from '@/variants/tooltip/tooltip-02.vue'
import Tooltip03 from '@/variants/tooltip/tooltip-03.vue'
import Tooltip04 from '@/variants/tooltip/tooltip-04.vue'
import Tooltip05 from '@/variants/tooltip/tooltip-05.vue'
import Tooltip06 from '@/variants/tooltip/tooltip-06.vue'
import Tooltip07 from '@/variants/tooltip/tooltip-07.vue'
</script>

<VariantPage>

<VariantItem name="tooltip-01" description="Tooltip bawaan, muncul saat kursor berhenti di atasnya."><Tooltip01 /></VariantItem>

<VariantItem name="tooltip-02" description="Dengan panah kecil yang menunjuk pemicunya."><Tooltip02 /></VariantItem>

<VariantItem name="tooltip-03" description="Empat sisi: kiri, atas, bawah, dan kanan."><Tooltip03 /></VariantItem>

<VariantItem name="tooltip-04" description="Pemicunya dimatikan, tooltipnya tetap muncul."><Tooltip04 /></VariantItem>

<VariantItem name="tooltip-05" description="Jeda sebelum muncul bisa diatur sendiri."><Tooltip05 /></VariantItem>

<VariantItem name="tooltip-06" description="Setelah satu tooltip terbuka, tetangganya muncul tanpa jeda."><Tooltip06 /></VariantItem>

<VariantItem name="tooltip-07" description="Digambar di luar induknya, jadi tidak terpotong wadahnya."><Tooltip07 /></VariantItem>

</VariantPage>
