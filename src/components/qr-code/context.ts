import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

/** Error correction level: L is the lightest, H is the most damage-resistant. */
export type QRCodeLevel = 'L' | 'M' | 'Q' | 'H'

export interface QRCodeState {
  value: string
  size: number
  margin: number
  level: QRCodeLevel
  backgroundColor: string
  foregroundColor: string
}

export interface QRCodeResult {
  /** The PNG as a data URL, used by `QRCodeImage` and PNG downloads. */
  dataUrl: Ref<string | null>
  /** The SVG as text, used by `QRCodeSvg` and SVG downloads. */
  svgString: Ref<string | null>
  isGenerating: Ref<boolean>
  error: Ref<Error | null>
  /** The `QRCodeCanvas` element, set by the child so the root can draw onto it. */
  canvas: Ref<HTMLCanvasElement | undefined>
}

export interface QRCodeContext {
  state: ComputedRef<QRCodeState>
  result: QRCodeResult
}

export const [provideQRCodeContext, injectQRCodeContext, injectQRCodeContextOptional]
  = createContext<QRCodeContext>('QRCode')
