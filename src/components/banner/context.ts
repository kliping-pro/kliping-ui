import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive'
export type BannerSide = 'top' | 'bottom'
export type BannerStrategy = 'fixed' | 'static' | 'sticky' | 'absolute'

/** The enter and exit animation duration, in milliseconds. */
export const ANIMATION_DURATION = 400

export interface RegisteredBanner {
  id: string
  priority: number
  /** The measured height, used to stack the next banner below it. */
  height: number
  /** Asked to close, but its animation has not finished yet. */
  closing: boolean
}

export interface BannersContext {
  items: Ref<RegisteredBanner[]>
  /** The container element each banner places itself into. */
  container: Ref<HTMLElement | undefined>
  side: ComputedRef<BannerSide>
  maxVisible: ComputedRef<number>
  register: (id: string, priority: number) => void
  unregister: (id: string) => void
  measure: (id: string, height: number) => void
  /** Closes a banner: starts its exit animation, then unregisters it. */
  close: (id: string) => void
  /** A banner's position in the queue, or -1 if it is not visible. */
  getIndex: (id: string) => number
  /** The distance from the edge to this banner, the sum of the heights above it. */
  getOffset: (id: string) => number
}

export const [provideBannersContext, injectBannersContext, injectBannersContextOptional]
  = createContext<BannersContext>('Banners')

export interface BannerContext {
  variant: BannerVariant
  dismissible: boolean
  close: () => void
}

export const [provideBannerContext, injectBannerContext, injectBannerContextOptional] = createContext<ComputedRef<BannerContext>>('Banner')
