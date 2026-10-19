import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export interface KanbanContext {
  disabled: boolean
  /** Each column's name, in display order. */
  columns: string[]
  /** Item ids per column, used to compute each item's index. */
  items: Record<string, string[]>
}

export const [provideKanbanContext, injectKanbanContext, injectKanbanContextOptional] = createContext<ComputedRef<KanbanContext>>('Kanban')

export interface KanbanColumnContext {
  value: string
  index: number
}

export const [provideKanbanColumnContext, injectKanbanColumnContext, injectKanbanColumnContextOptional] = createContext<ComputedRef<KanbanColumnContext>>('KanbanColumn')

export interface KanbanItemContext {
  value: string
  index: number
  column: string
  disabled: boolean
}

export const [provideKanbanItemContext, injectKanbanItemContext, injectKanbanItemContextOptional] = createContext<ComputedRef<KanbanItemContext>>('KanbanItem')
