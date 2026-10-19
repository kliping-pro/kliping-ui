import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type SortableOrientation = 'vertical' | 'horizontal' | 'mixed'

export interface SortableContext {
  orientation: SortableOrientation
  disabled: boolean
  /** The current id order, used to compute each item's index. */
  order: string[]
}

export const [provideSortableContext, injectSortableContext, injectSortableContextOptional] = createContext<ComputedRef<SortableContext>>('Sortable')

export interface SortableItemContext {
  id: string
  index: number
  disabled: boolean
}

export const [provideSortableItemContext, injectSortableItemContext, injectSortableItemContextOptional]
  = createContext<ComputedRef<SortableItemContext>>('SortableItem')
