<script lang="ts">
export const description = "Logo bergulir di dalam kartu bersinar tepi."
</script>

<script setup lang="ts">
import { onMounted, onScopeDispose, useTemplateRef } from 'vue'
import { Logo01, Logo02, Logo03, Logo04, Logo05, Logo06, Logo07, Logo08 } from '@/components/logos'
import { BorderBeam } from '@/components/ui/border-beam'
import { Marquee } from '@/components/ui/marquee'

// Harus sama dengan prop yang diberikan ke BorderBeam di bawah — gelombang di
// teks mengejar sinar yang sama, jadi keduanya membaca angka yang sama.
const BEAM_DURATION = 8
const BEAM_SIZE = 100

const card = useTemplateRef<HTMLDivElement>('card')
const text = useTemplateRef<HTMLParagraphElement>('text')
const wave = useTemplateRef<HTMLSpanElement>('wave')

// Satu-satunya animasi di seluruh 202 block yang benar-benar butuh gelung per
// frame, dan alasannya jelas: ia membaca geometri hidup — lebar kartu dan posisi
// teks — untuk menghitung kapan sinar di tepi kartu sedang lewat di belakang
// teksnya. Nilai itu tidak bisa ditulis sebagai keyframes karena bergantung pada
// ukuran yang baru diketahui saat halamannya digambar.
//
// Sumbernya memakai `useAnimationFrame` dari pustaka animasi. Yang dilakukannya
// persis `requestAnimationFrame` dengan stempel waktu, jadi di sini dipanggil
// langsung — dan dibatalkan di `onScopeDispose` supaya berpindah halaman tidak
// meninggalkannya tetap berjalan.
onMounted(() => {
  let frame = 0
  let start: number | null = null

  const step = (time: number) => {
    frame = requestAnimationFrame(step)

    const cardRect = card.value?.getBoundingClientRect()
    const textRect = text.value?.getBoundingClientRect()
    const span = wave.value
    if (!(cardRect && textRect && span))
      return

    start ??= time

    // Posisi sinar: 0–100 sepanjang keliling kartu, satu putaran per BEAM_DURATION.
    const elapsed = ((time - start) / 1000) % BEAM_DURATION
    const beamPosition = (elapsed / BEAM_DURATION) * 100

    const perimeter = 2 * (cardRect.width + cardRect.height)
    const left = Math.max(0, textRect.left - cardRect.left)
    const right = Math.min(cardRect.width, textRect.right - cardRect.left)

    const textStart = (left / perimeter) * 100
    const textEnd = (right / perimeter) * 100

    if (beamPosition >= textStart && beamPosition <= textEnd) {
      // Sinarnya sedang di belakang teks. Gelombangnya disapu 95% → 5%: di kedua
      // ujung itu yang terlihat cuma currentColor, jadi tidak ada kedipan saat
      // masuk maupun keluar.
      const t = (beamPosition - textStart) / (textEnd - textStart)
      span.style.backgroundPosition = `${95 - t * 90}% center`
    }
    else if (beamPosition < textStart) {
      span.style.backgroundPosition = '0% center'
    }
    else {
      span.style.backgroundPosition = '100% center'
    }
  }

  frame = requestAnimationFrame(step)
  onScopeDispose(() => cancelAnimationFrame(frame))
})

// Gelombangnya hidup di pita sempit 47–53% dari gradien selebar 250%. Di posisi
// 0% elemennya cuma melihat 0–40% gradien — currentColor saja; di 100% ia cuma
// melihat 60–100% — juga currentColor saja.
const waveStyle = {
  backgroundImage:
    'linear-gradient(90deg, currentColor 0%, currentColor 45%, #ffaa40 47%, #9c40ff 50%, #ffaa40 53%, currentColor 55%, currentColor 100%)',
  backgroundSize: '250% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundPosition: '0% center',
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div ref="card" class="relative max-w-(--breakpoint-lg) rounded-lg border">
      <BorderBeam class="isolate -z-1" :duration="BEAM_DURATION" :size="BEAM_SIZE" />

      <div class="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center px-10">
        <p
          ref="text"
          class="bg-background px-3 text-center text-xl font-medium tracking-[-0.01em] text-foreground/80 sm:px-6"
        >
          <span ref="wave" :style="waveStyle">
            Trusted by 1000+ companies
            <span class="max-sm:hidden">around the world</span>
          </span>
        </p>
      </div>

      <div class="grid">
        <div class="flex min-w-0 items-center justify-center gap-x-14 gap-y-10 p-10 pt-12 *:h-14">
          <Marquee class="mask-x-from-75% [--duration:20s] [&_svg]:mr-10" pause-on-hover>
            <Logo01 />
            <Logo02 />
            <Logo03 />
            <Logo04 />
            <Logo05 />
            <Logo06 />
            <Logo07 />
            <Logo08 />
          </Marquee>
        </div>
      </div>
    </div>
  </div>
</template>
