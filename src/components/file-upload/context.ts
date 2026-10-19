import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export interface SelectedFile {
  /** Stable key, used for `:key` and progress tracking. */
  id: string
  file: File
  progress: number
  status: UploadStatus
  error?: string
}

export interface FileUploadState {
  files: SelectedFile[]
  accept?: string
  maxFiles?: number
  maxSize?: number
  multiple: boolean
  disabled: boolean
  invalid: boolean
  /** A file is being dragged over the dropzone. */
  dragging: boolean
  dir: 'ltr' | 'rtl'
}

export interface FileUploadContext {
  state: ComputedRef<FileUploadState>
  /** Opens the file picker dialog. */
  open: () => void
  add: (files: File[]) => void
  remove: (id: string) => void
  clear: () => void
  dragging: Ref<boolean>
}

export const [provideFileUploadContext, injectFileUploadContext, injectFileUploadContextOptional]
  = createContext<FileUploadContext>('FileUpload')

export const [provideFileUploadItemContext, injectFileUploadItemContext, injectFileUploadItemContextOptional]
  = createContext<ComputedRef<SelectedFile>>('FileUploadItem')
