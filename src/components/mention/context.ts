import type { ComputedRef, Ref } from 'vue'
import type { CaretPosition } from './caret'
import { createContext } from '@/lib/create-context'

export interface MentionState {
  /** The character that opens the suggestion list. */
  trigger: string
  /** The word being typed after the trigger. */
  query: string
  open: boolean
  /** The value of the item currently highlighted by the keyboard. */
  highlighted: string | null
  position: CaretPosition | null
}

export interface MentionContext {
  state: ComputedRef<MentionState>
  /** The full text — the root's `v-model`, shared so the input writes to it. */
  text: Ref<string>
  input: Ref<HTMLInputElement | HTMLTextAreaElement | undefined>
  /** The value of each rendered item, in display order. */
  items: Ref<string[]>
  registerItem: (value: string) => void
  unregisterItem: (value: string) => void
  highlight: (value: string | null) => void
  /** Inserts a value in place of the mention being typed. */
  select: (value: string) => void
  close: () => void
  /** Re-reads the mention state from the input's text and cursor position. */
  refresh: () => void
  /** Moves the highlight one step, for the up and down arrows. */
  moveHighlight: (direction: 1 | -1) => void
}

export const [provideMentionContext, injectMentionContext, injectMentionContextOptional] = createContext<MentionContext>('Mention')
