// Satu sumber perintah CLI di seluruh situs: generator halaman (scripts/),
// tema (tab Install, InstallCLI), dan pemeriksa (scripts/check-commands.mjs)
// memakai berkas ini. Perintah ditulis dalam bentuk npx; komponen
// PackageCommand menerjemahkannya ke pnpm / yarn / bun.

/** The npm package spec readers run. */
export const KLIPING_CLI = 'kliping@latest'

/** `npx kliping@latest <args>`. */
export function klipingCommand(args) {
  return `npx ${KLIPING_CLI} ${args}`
}

/** `npx kliping@latest add <names…>` — names are registry item names. */
export function klipingAdd(names) {
  const list = (Array.isArray(names) ? names : [names]).filter(Boolean)
  return list.length ? klipingCommand(`add ${[...new Set(list)].join(' ')}`) : ''
}

/**
 * `npx kliping@latest add <names…> --page <file>` — the Builder page: every
 * name in order, repeats included, so the page matches the Builder.
 */
export function klipingAddPage(names, file) {
  return names.length ? klipingCommand(`add ${names.join(' ')} --page ${file}`) : ''
}
