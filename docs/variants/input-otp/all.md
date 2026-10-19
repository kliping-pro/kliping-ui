---
title: Input OTP
description: "Tujuh isian kode sekali pakai, berbeda di pemisah, bentuk kotak, dan jaraknya."
layout: page
---

<script setup>
import InputOtp01 from '@/variants/input-otp/input-otp-01.vue'
import InputOtp02 from '@/variants/input-otp/input-otp-02.vue'
import InputOtp03 from '@/variants/input-otp/input-otp-03.vue'
import InputOtp04 from '@/variants/input-otp/input-otp-04.vue'
import InputOtp05 from '@/variants/input-otp/input-otp-05.vue'
import InputOtp06 from '@/variants/input-otp/input-otp-06.vue'
import InputOtp07 from '@/variants/input-otp/input-otp-07.vue'
</script>

<VariantPage>

<VariantItem name="input-otp-01" description="Enam kotak, dibelah dua oleh tanda hubung di tengahnya."><InputOtp01 /></VariantItem>

<VariantItem name="input-otp-02" description="Empat kotak yang menyatu, tanpa pemisah."><InputOtp02 /></VariantItem>

<VariantItem name="input-otp-03" description="Tiap kotak berdiri sendiri, dipisahkan jarak."><InputOtp03 /></VariantItem>

<VariantItem name="input-otp-04" description="Kotak terpisah, dibelah dua kelompok."><InputOtp04 /></VariantItem>

<VariantItem name="input-otp-05" description="Kotak berlatar abu dengan angka tebal."><InputOtp05 /></VariantItem>

<VariantItem name="input-otp-06" description="Dibelah titik bulat, bukan tanda hubung."><InputOtp06 /></VariantItem>

<VariantItem name="input-otp-07" description="Kotak bercekung, bayangannya di dalam."><InputOtp07 /></VariantItem>

</VariantPage>
