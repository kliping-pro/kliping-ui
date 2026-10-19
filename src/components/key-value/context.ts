import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export interface KeyValueEntry {
  id: string
  key: string
  value: string
}

export interface KeyValueState {
  keyPlaceholder: string
  valuePlaceholder: string
  disabled: boolean
  readonly: boolean
  required: boolean
  enablePaste: boolean
  /** Trim whitespace at both ends when pasting. */
  trim: boolean
  /** Remove quotes wrapping values when pasting. */
  stripQuotes: boolean
  /** The item limit is reached, so the add button is disabled. */
  full: boolean
  /** Errors per entry, keyed by id. */
  errors: Record<string, string | undefined>
}

export interface KeyValueContext {
  state: ComputedRef<KeyValueState>
  entries: Ref<KeyValueEntry[]>
  update: (id: string, patch: Partial<Omit<KeyValueEntry, 'id'>>) => void
  add: (after?: string) => void
  remove: (id: string) => void
  /** Inserts multi-line pasted pairs, replacing an empty entry. */
  insert: (id: string, pairs: { key: string, value: string }[]) => void
}

export const [provideKeyValueContext, injectKeyValueContext, injectKeyValueContextOptional]
  = createContext<KeyValueContext>('KeyValue')

export const [provideKeyValueItemContext, injectKeyValueItemContext, injectKeyValueItemContextOptional]
  = createContext<ComputedRef<KeyValueEntry>>('KeyValueItem')
