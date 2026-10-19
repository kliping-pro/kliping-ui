import type { ComputedRef, Ref } from 'vue'
import type { TimeRange } from './time'
import { createContext } from '@/lib/create-context'

export interface MediaPlayerState {
  currentTime: number
  duration: number
  playing: boolean
  buffering: boolean
  ended: boolean
  volume: number
  muted: boolean
  playbackRate: number
  buffered: TimeRange[]
  fullscreen: boolean
  pictureInPicture: boolean
  /** Whether the controls are currently visible. */
  visible: boolean
  /** Playback error message, if any. */
  error: string | undefined
  disabled: boolean
  // Sebagian kendali cuma masuk akal untuk video.
  /** Whether the player is a video rather than audio. */
  video: boolean
}

export interface MediaPlayerContext {
  state: ComputedRef<MediaPlayerState>
  // Diisi `MediaPlayerVideo`/`MediaPlayerAudio`.
  /** The `<video>` or `<audio>` element. */
  media: Ref<HTMLMediaElement | undefined>
  container: Ref<HTMLElement | undefined>
  play: () => void
  pause: () => void
  toggle: () => void
  seekTo: (seconds: number) => void
  seekBy: (seconds: number) => void
  setVolume: (value: number) => void
  toggleMute: () => void
  setPlaybackRate: (value: number) => void
  toggleFullscreen: () => void
  togglePictureInPicture: () => void
  /** Keeps the controls visible while something is interacting with them. */
  hold: (value: boolean) => void
}

export const [provideMediaPlayerContext, injectMediaPlayerContext, injectMediaPlayerContextOptional] = createContext<MediaPlayerContext>('MediaPlayer')
