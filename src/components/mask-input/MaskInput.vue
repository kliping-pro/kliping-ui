<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MaskPattern, MaskPatternKey } from './patterns'
import { computed, nextTick, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { applyMask, MASK_PATTERNS, unmask } from './patterns'

/**
 * Masukan yang merapikan ketikan mengikuti pola.
 *
 * `v-model` menyimpan nilai MENTAH — tanpa pemisah — dan yang terlihat di
 * layar yang sudah dirapikan. Itu keputusan yang dibawa dari sumbernya dan
 * tetap benar: yang dikirim ke server dan disimpan di basis data tidak
 * seharusnya membawa tanda kurung dan garis yang cuma ada untuk mata.
 *
 * Letak kursor dijaga saat menyunting di tengah teks. Tanpa penjagaan itu,
 * tiap ketikan melemparkannya ke ujung — dan menyunting angka keempat dari
 * nomor enam belas digit jadi mustahil.
 */
const props = withDefaults(defineProps<{
  /** A ready-made pattern name, or a custom pattern. */
  mask: MaskPatternKey | MaskPattern
  /** Shows the value as-is, without formatting. */
  withoutMask?: boolean
  /** Forces the invalid style and `aria-invalid`, in addition to the pattern's own validation. */
  invalid?: boolean
  /** Placeholder text; defaults to the mask pattern itself. */
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  id?: string
  /** Virtual keyboard hint: `text`, `numeric`, `tel`, or `decimal`. */
  inputmode?: 'text' | 'numeric' | 'tel' | 'decimal'
  class?: HTMLAttributes['class']
}>(), {
  withoutMask: false,
})

const emit = defineEmits<{
  /** The formatted and raw values together. */
  valueChange: [formatted: string, raw: string]
  /** The pattern validation result, emitted every time the value changes. */
  validate: [valid: boolean, raw: string]
}>()

const model = defineModel<string>({ default: '' })

const pattern = computed<MaskPattern>(() =>
  (typeof props.mask === 'string' ? MASK_PATTERNS[props.mask] : props.mask))

const inputRef = ref<HTMLInputElement>()

const displayValue = computed(() => (props.withoutMask
  ? model.value
  : applyMask(model.value, pattern.value.pattern)))

const isValid = computed(() => pattern.value.validate?.(model.value) ?? true)

/** How many content characters (not separators) precede a position. */
function contentBefore(text: string, position: number): number {
  return unmask(text.slice(0, position), pattern.value.pattern).length
}

/** The position right after the n-th content character. */
function positionAfter(text: string, count: number): number {
  if (count <= 0) return 0
  let counted = 0
  const p = pattern.value.pattern
  for (let i = 0; i < text.length; i++) {
    if (i < p.length && (p[i] === '#' || p[i] === 'A' || p[i] === '*')) counted++
    if (counted >= count) return i + 1
  }
  return text.length
}

function onInput(event: Event) {
  const el = event.target as HTMLInputElement
  const previousCursor = el.selectionStart ?? el.value.length

  // Yang dihitung posisi kursor dalam satuan aksara ISI, bukan dalam satuan
  // aksara terlihat — pemisah yang disisipkan perapian menggeser yang kedua.
  const contentBeforeCursor = contentBefore(el.value, previousCursor)

  const cleaned = pattern.value.transform?.(el.value) ?? el.value
  const raw = props.withoutMask ? cleaned : unmask(applyMask(cleaned, pattern.value.pattern), pattern.value.pattern)

  model.value = raw
  emit('valueChange', props.withoutMask ? raw : applyMask(raw, pattern.value.pattern), raw)
  emit('validate', pattern.value.validate?.(raw) ?? true, raw)

  nextTick(() => {
    if (!inputRef.value) return
    const position = props.withoutMask
      ? previousCursor
      : positionAfter(inputRef.value.value, contentBeforeCursor)
    inputRef.value.setSelectionRange(position, position)
  })
}

// Nilai yang diganti dari luar tetap harus tergambar rapi. `displayValue` sudah
// menghitungnya; watch ini cuma menjaga elemennya ikut kalau Vue tidak
// menganggap nilainya berubah — yang terjadi saat perapian menghasilkan teks
// yang sama dengan yang sudah ada di sana.
watch(displayValue, (next) => {
  if (inputRef.value && inputRef.value.value !== next) inputRef.value.value = next
})
</script>

<template>
  <input
    ref="inputRef"
    :aria-invalid="props.invalid || !isValid ? 'true' : undefined"
    :class="cn(
      'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      props.class,
    )"
    :data-invalid="props.invalid ? '' : undefined"
    data-slot="mask-input"
    :disabled="props.disabled"
    :id="props.id"
    :inputmode="props.inputmode"
    :name="props.name"
    :placeholder="props.placeholder ?? pattern.pattern"
    :readonly="props.readonly"
    :required="props.required"
    :value="displayValue"
    @input="onInput"
  >
</template>
