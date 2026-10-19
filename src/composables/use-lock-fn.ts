/**
 * Membungkus fungsi async supaya tidak bisa jalan dua kali bersamaan.
 *
 * Gunanya satu dan konkret: tombol kirim yang ditekan dua kali tidak mengirim
 * dua kali. Panggilan yang datang saat panggilan sebelumnya belum selesai
 * diabaikan — bukan diantrikan, bukan ditunda.
 *
 * Kuncinya dilepas di `finally`, jadi ikut terlepas juga saat fungsinya
 * melempar. Tanpa itu satu kegagalan mengunci tombolnya selamanya, dan itu
 * jenis cacat yang cuma muncul di hari yang buruk.
 */
/**
 * @param fn Async function to guard.
 * @returns Wrapped function; calls made while a previous call is pending are ignored and resolve to `undefined`.
 */
export function useLockFn<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>,
) {
  let locked = false

  return async (...args: P): Promise<V | undefined> => {
    if (locked)
      return undefined

    locked = true
    try {
      return await fn(...args)
    }
    finally {
      locked = false
    }
  }
}
