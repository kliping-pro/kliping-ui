import type { ComputedRef, Ref } from 'vue'
import type { CropArea, Point, Size } from './crop'
import { createContext } from '@/lib/create-context'

export interface CropperState {
  /** Natural size of the media, zero before it loads. */
  media: Size
  container: Size
  frame: Size
  offset: Point
  zoom: number
  rotation: number
  /** Effective scale: the base scale times the zoom. */
  scale: number
  disabled: boolean
  // Untuk mematikan transisi supaya seretannya tidak tertinggal.
  /** Whether the media is being dragged. */
  dragging: boolean
  /** Crop area in source pixels, in the rotated frame of reference. */
  crop: CropArea
}

export interface CropperContext {
  state: ComputedRef<CropperState>
  setZoom: (value: number) => void
  setRotation: (value: number) => void
  setOffset: (value: Point) => void
  setMedia: (size: Size) => void
  setDragging: (value: boolean) => void
  reset: () => void
  // Dibaca `CropperViewport` untuk zum roda dan `CropperZoom` untuk tombolnya.
  /** Zoom limits and step. */
  zoomLimits: ComputedRef<{ min: number, max: number, step: number }>
  // Diisi `CropperViewport` dan diukur untuk menghitung bingkai.
  /** The container element. */
  container: Ref<HTMLElement | undefined>
}

export const [provideCropperContext, injectCropperContext, injectCropperContextOptional] = createContext<CropperContext>('Cropper')
