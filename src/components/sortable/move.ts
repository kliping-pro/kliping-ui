/**
 * Memindahkan satu unsur array ke posisi lain.
 *
 * `@dnd-kit/helpers` menyediakan `move` untuk ini, tapi paket itu tidak
 * terpasang di sini — dan yang dibutuhkannya cuma sepuluh baris.
 *
 * Yang dikembalikan array baru, bukan yang lama disunting. Array yang
 * disunting di tempat tidak mengubah identitasnya, dan `computed` yang
 * membacanya tidak akan pernah tahu isinya berganti.
 */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length)
    return [...items]

  const result = [...items]
  const [moved] = result.splice(from, 1)
  result.splice(to, 0, moved as T)
  return result
}

/** Moves an item between two arrays — used by kanban when a card changes columns. */
export function moveBetween<T>(
  source: readonly T[],
  target: readonly T[],
  from: number,
  to: number,
): { source: T[], target: T[] } {
  const remaining = [...source]
  const [moved] = remaining.splice(from, 1)

  if (moved === undefined) return { source: [...source], target: [...target] }

  const inserted = [...target]
  inserted.splice(Math.max(0, Math.min(to, inserted.length)), 0, moved)

  return { source: remaining, target: inserted }
}
