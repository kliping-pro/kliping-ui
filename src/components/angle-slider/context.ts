import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export interface AngleSliderState {
  values: number[]
  min: number
  max: number
  step: number
  size: number
  thickness: number
  startAngle: number
  endAngle: number
  disabled: boolean
  dir: 'ltr' | 'rtl'
  /** The circle's center point in SVG coordinates. */
  center: number
  /** The track radius. */
  radius: number
  /** The full arc size in degrees, 360 for a full circle. */
  totalAngle: number
}

export interface AngleSliderContext {
  state: ComputedRef<AngleSliderState>
  /** Moves a thumb to a given value. */
  setValue: (index: number, value: number) => void
  /** The angle of a value in degrees, already mapped onto the range and arc. */
  getAngle: (value: number) => number
  /** The point on the track for an angle. */
  getPoint: (degrees: number) => { x: number, y: number }
}

export const [provideAngleSliderContext, injectAngleSliderContext, injectAngleSliderContextOptional] = createContext<AngleSliderContext>('AngleSlider')

/** Fixed distance from the canvas edge to the track, leaving room for the thumb. */
export const EDGE_PADDING = 20
