---
title: Separator
description: "Tujuh pemisah, mendatar maupun tegak, dengan dan tanpa label di tengahnya."
layout: page
---

<script setup>
import Separator01 from '@/variants/separator/separator-01.vue'
import Separator02 from '@/variants/separator/separator-02.vue'
import Separator03 from '@/variants/separator/separator-03.vue'
import Separator04 from '@/variants/separator/separator-04.vue'
import Separator05 from '@/variants/separator/separator-05.vue'
import Separator06 from '@/variants/separator/separator-06.vue'
import WithLabelVertical from '@/variants/separator/with-label-vertical.vue'
</script>

<VariantPage>

<VariantItem name="separator-01" description="Pemisah mendatar dan tegak dalam satu contoh."><Separator01 /></VariantItem>

<VariantItem name="separator-02" description="Tulisan OR di tengah garis pemisahnya."><Separator02 /></VariantItem>

<VariantItem name="separator-03" description="Label pemisahnya berbentuk lencana bulat."><Separator03 /></VariantItem>

<VariantItem name="separator-04" description="Garis putus-putus, bukan garis penuh."><Separator04 /></VariantItem>

<VariantItem name="separator-05" description="Pemisah tegak antara dua kolom."><Separator05 /></VariantItem>

<VariantItem name="separator-06" description="Pemisah tegak dengan label bulat di tengahnya."><Separator06 /></VariantItem>

<VariantItem name="with-label-vertical" description="Pemisah tegak berlabel di dalam kartu."><WithLabelVertical /></VariantItem>

</VariantPage>
