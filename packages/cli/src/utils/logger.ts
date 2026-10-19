import { highlighter } from '@/src/utils/highlighter'

// Straight to the console, not through consola: without a TTY (CI, pipes)
// consola's basic reporter prefixes every line with "[log]", which also
// broke JSON printed by view/docs/info for other tools.
export const logger = {
  error(...args: unknown[]) {
    console.log(highlighter.error(args.join(' ')))
  },
  warn(...args: unknown[]) {
    console.log(highlighter.warn(args.join(' ')))
  },
  info(...args: unknown[]) {
    console.log(highlighter.info(args.join(' ')))
  },
  success(...args: unknown[]) {
    console.log(highlighter.success(args.join(' ')))
  },
  log(...args: unknown[]) {
    console.log(args.join(' '))
  },
  break() {
    console.log('')
  },
}
