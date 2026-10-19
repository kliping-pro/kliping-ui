import type { Component } from 'vue'
import {
  ActivityIcon,
  AlarmClockIcon,
  ArrowDownToLineIcon,
  ArrowUpToLineIcon,
  BatteryMediumIcon,
  BookOpenIcon,
  BracesIcon,
  CalculatorIcon,
  CircleGaugeIcon,
  ClipboardIcon,
  CloudDownloadIcon,
  CrosshairIcon,
  DatabaseZapIcon,
  DownloadIcon,
  DropletIcon,
  EarIcon,
  EyeIcon,
  FilmIcon,
  FocusIcon,
  GaugeIcon,
  GitCompareArrowsIcon,
  GitCompareIcon,
  GlobeIcon,
  HandIcon,
  HashIcon,
  HeadingIcon,
  HeartIcon,
  HistoryIcon,
  HourglassIcon,
  LaptopIcon,
  LayersIcon,
  LockIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  MaximizeIcon,
  MemoryStickIcon,
  MonitorSmartphoneIcon,
  MouseIcon,
  MousePointerClickIcon,
  NetworkIcon,
  PackagePlusIcon,
  PlayIcon,
  PlugIcon,
  PointerOffIcon,
  RefreshCcwDotIcon,
  RefreshCwIcon,
  RepeatIcon,
  RotateCcwIcon,
  RulerIcon,
  ScanIcon,
  SearchCodeIcon,
  ServerIcon,
  Share2Icon,
  SlidersHorizontalIcon,
  SquareFunctionIcon,
  TargetIcon,
  TextCursorIcon,
  TimerResetIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  WifiIcon,
  ZapIcon,
} from '@lucide/vue'

/**
 * Ikon tiap halaman Hooks — untuk deret yang memuat banyak nama composable
 * sekaligus: dialog cari Hooks dan sidebar-nya.
 *
 * Di daftar sepanjang itu, deret `use…` yang berawalan sama sulit dipindai;
 * ikon memberi tiap baris pegangan untuk mata. Semuanya dari Lucide — set yang
 * sama dengan seluruh chrome situs — jadi tebal garis dan ukurannya seragam.
 * Ikonnya menggambar apa yang dikerjakan composable-nya, bukan namanya:
 * jam pasir untuk debounce, alat ukur untuk throttle, gembok untuk lock.
 *
 * Kartu di halaman Hooks tidak memakai ini — di sana cuplikan kodenya yang
 * jadi gambar.
 */
const ICONS: Record<string, Component> = {
  // Getting Started
  'introduction': BookOpenIcon,
  'installation': DownloadIcon,
  'credits': HeartIcon,
  // State
  'use-boolean': ToggleLeftIcon,
  'use-controllable-value': SlidersHorizontalIcon,
  'use-counter': CalculatorIcon,
  'use-debounce': HourglassIcon,
  'use-reset-state': RotateCcwIcon,
  'use-throttle': GaugeIcon,
  'use-toggle': ToggleRightIcon,
  // Advanced
  'use-creation': PackagePlusIcon,
  'use-custom-compare-effect': GitCompareIcon,
  'use-latest': ArrowUpToLineIcon,
  'use-lock-fn': LockIcon,
  'use-memoized-fn': MemoryStickIcon,
  'use-previous': HistoryIcon,
  // Lifecycle
  'use-debounce-effect': TimerResetIcon,
  'use-debounce-fn': SquareFunctionIcon,
  'use-deep-compare-effect': GitCompareArrowsIcon,
  'use-deep-compare-layout-effect': LayersIcon,
  'use-effect-event': ZapIcon,
  'use-effect-with-target': CrosshairIcon,
  'use-interval': RepeatIcon,
  'use-is-hydrated': DropletIcon,
  'use-isomorphic-layout-effect': ServerIcon,
  'use-mount': LogInIcon,
  'use-throttle-effect': ActivityIcon,
  'use-throttle-fn': CircleGaugeIcon,
  'use-timeout': AlarmClockIcon,
  'use-unmount': LogOutIcon,
  'use-update': RefreshCwIcon,
  'use-update-effect': RefreshCcwDotIcon,
  // Browser
  'use-active-element': FocusIcon,
  'use-battery': BatteryMediumIcon,
  'use-click-any-where': MousePointerClickIcon,
  'use-click-away': PointerOffIcon,
  'use-clipboard': ClipboardIcon,
  'use-document-visibility': EyeIcon,
  'use-element-size': RulerIcon,
  'use-event-listener': EarIcon,
  'use-fps': FilmIcon,
  'use-fullscreen': MaximizeIcon,
  'use-hash': HashIcon,
  'use-hover': HandIcon,
  'use-in-viewport': ScanIcon,
  'use-is-match-media': MonitorSmartphoneIcon,
  'use-is-online': WifiIcon,
  'use-mouse': MouseIcon,
  'use-network': NetworkIcon,
  'use-os': LaptopIcon,
  'use-scroll-lock': LockKeyholeIcon,
  'use-text-selection': TextCursorIcon,
  'use-title': HeadingIcon,
  // Development
  'use-why-did-you-update': SearchCodeIcon,
  // Third-Party
  'use-mcp': PlugIcon,
  'use-query': DatabaseZapIcon,
  'use-stick-to-bottom': ArrowDownToLineIcon,
  'use-swr': CloudDownloadIcon,
  // Libraries
  'is-browser': GlobeIcon,
  'create-context': Share2Icon,
  'target': TargetIcon,
  'try-on-mounted': PlayIcon,
}

/** Ikon sebuah halaman Hooks dari namanya (`use-boolean`) atau jalurnya (`/hooks/use-boolean`). */
export function hookIcon(nameOrPath: string): Component {
  const name = nameOrPath.replace(/^\/hooks\//, '').replace(/\/$/, '')
  return ICONS[name] ?? BracesIcon
}
