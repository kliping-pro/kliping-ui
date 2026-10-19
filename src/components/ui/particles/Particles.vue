<script setup lang="ts">
/**
 * Partikel yang mengambang dan menjauh pelan dari kursor.
 *
 * Digambar di `<canvas>`, bukan sebagai elemen DOM — seratus titik yang bergerak
 * tiap frame sebagai seratus node akan membuat peramban menghitung ulang tata
 * letak seratus kali per frame.
 *
 * Tiga hal diperbaiki dari sumbernya, dan ketiganya bukan selera:
 *
 * 1. **Gelung `requestAnimationFrame`-nya dihentikan.** Di sumbernya gelung itu
 *    memanggil dirinya sendiri selamanya dan tidak pernah dibatalkan; berpindah
 *    halaman meninggalkannya tetap berjalan. Lebih buruk lagi, mengubah `color`
 *    menjalankan gelung kedua di atas yang pertama.
 * 2. **Ukuran wadahnya diamati `ResizeObserver`, bukan `resize` di window.**
 *    Wadah yang berubah karena tata letak di sekitarnya bergeser tidak pernah
 *    memicu `resize`, dan kanvasnya akan tertinggal ukurannya.
 * 3. **Partikel yang keluar layar dibuang dari belakang.** Menghapus elemen di
 *    tengah `forEach` membuat elemen sesudahnya terlewat.
 */
import { onMounted, onScopeDispose, useTemplateRef, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** How many particles to draw. */
  quantity?: number
  /** The higher it is, the less the particles react to the pointer. */
  staticity?: number
  /** The higher it is, the slower particles catch up to their new position. */
  ease?: number
  /** The base size of each particle. */
  size?: number
  /** The particle color, in hex. */
  color?: string
  /** A constant horizontal drift. */
  vx?: number
  /** A constant vertical drift. */
  vy?: number
}>(), {
  quantity: 100,
  staticity: 50,
  ease: 50,
  size: 0.4,
  color: '#ffffff',
  vx: 0,
  vy: 0,
})

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnet: number
}

const container = useTemplateRef<HTMLDivElement>('container')
const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let ctx: CanvasRenderingContext2D | null = null
let circles: Circle[] = []
let frameId = 0
let dpr = 1
const canvasSize = { w: 0, h: 0 }
const mouse = { x: 0, y: 0 }
let rgb: [number, number, number] = [255, 255, 255]

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '')
  if (clean.length === 3)
    clean = clean.split('').map(c => c + c).join('')

  const value = Number.parseInt(clean, 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function createCircle(): Circle {
  return {
    x: Math.floor(Math.random() * canvasSize.w),
    y: Math.floor(Math.random() * canvasSize.h),
    translateX: 0,
    translateY: 0,
    size: Math.floor(Math.random() * 2) + props.size,
    alpha: 0,
    targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnet: 0.1 + Math.random() * 4,
  }
}

function clearCanvas() {
  ctx?.clearRect(0, 0, canvasSize.w, canvasSize.h)
}

function drawCircle(b: Circle, update = false) {
  if (!ctx)
    return

  ctx.translate(b.translateX, b.translateY)
  ctx.beginPath()
  ctx.arc(b.x, b.y, b.size, 0, 2 * Math.PI)
  ctx.fillStyle = `rgba(${rgb.join(', ')}, ${b.alpha})`
  ctx.fill()
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (!update)
    circles.push(b)
}

function resizeCanvas() {
  if (!(container.value && canvas.value && ctx))
    return

  circles = []
  canvasSize.w = container.value.offsetWidth
  canvasSize.h = container.value.offsetHeight
  canvas.value.width = canvasSize.w * dpr
  canvas.value.height = canvasSize.h * dpr
  canvas.value.style.width = `${canvasSize.w}px`
  canvas.value.style.height = `${canvasSize.h}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function initCanvas() {
  resizeCanvas()
  clearCanvas()
  for (let i = 0; i < props.quantity; i++)
    drawCircle(createCircle())
}

/** Remaps a value to another range, never below zero. */
function remapValue(value: number, start1: number, end1: number, start2: number, end2: number) {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

function animate() {
  clearCanvas()

  // Dari belakang, supaya penghapusan tidak membuat yang berikutnya terlewat.
  for (let i = circles.length - 1; i >= 0; i--) {
    const b = circles[i]

    // Partikel memudar saat mendekati tepi, jadi ia tidak terpotong mendadak.
    const edgeDistance = Math.min(
      b.x + b.translateX - b.size,
      canvasSize.w - b.x - b.translateX - b.size,
      b.y + b.translateY - b.size,
      canvasSize.h - b.y - b.translateY - b.size,
    )
    const edgeFactor = Number.parseFloat(remapValue(edgeDistance, 0, 20, 0, 1).toFixed(2))

    if (edgeFactor > 1)
      b.alpha = Math.min(b.alpha + 0.02, b.targetAlpha)
    else
      b.alpha = b.targetAlpha * edgeFactor

    b.x += b.dx + props.vx
    b.y += b.dy + props.vy
    b.translateX += (mouse.x / (props.staticity / b.magnet) - b.translateX) / props.ease
    b.translateY += (mouse.y / (props.staticity / b.magnet) - b.translateY) / props.ease

    drawCircle(b, true)

    const isOutside = b.x < -b.size
      || b.x > canvasSize.w + b.size
      || b.y < -b.size
      || b.y > canvasSize.h + b.size

    if (isOutside) {
      circles.splice(i, 1)
      drawCircle(createCircle())
    }
  }

  frameId = requestAnimationFrame(animate)
}

function onMouseMove(e: MouseEvent) {
  if (!canvas.value)
    return

  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left - canvasSize.w / 2
  const y = e.clientY - rect.top - canvasSize.h / 2

  // Kursor di luar kanvas dibiarkan — partikelnya tetap di posisi terakhir,
  // bukan tersentak balik ke tengah.
  if (Math.abs(x) < canvasSize.w / 2 && Math.abs(y) < canvasSize.h / 2) {
    mouse.x = x
    mouse.y = y
  }
}

onMounted(() => {
  if (!canvas.value)
    return

  dpr = window.devicePixelRatio || 1
  ctx = canvas.value.getContext('2d')
  rgb = hexToRgb(props.color)
  initCanvas()

  frameId = requestAnimationFrame(animate)
  window.addEventListener('mousemove', onMouseMove)

  const observer = new ResizeObserver(() => initCanvas())
  observer.observe(container.value as HTMLDivElement)

  onScopeDispose(() => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('mousemove', onMouseMove)
    observer.disconnect()
  })
})

watch(() => props.color, (next) => {
  rgb = hexToRgb(next)
})

watch(() => props.quantity, () => {
  if (ctx)
    initCanvas()
})
</script>

<template>
  <div
    ref="container"
    data-slot="particles"
    aria-hidden="true"
    :class="cn('pointer-events-none', props.class)"
  >
    <canvas ref="canvas" class="size-full" />
  </div>
</template>
