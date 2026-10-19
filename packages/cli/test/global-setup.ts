import type { AddressInfo } from 'node:net'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { resolve } from 'pathe'

// Uji transform membaca icons/index.json, warna, dan gaya dari registry.
// Tanpa REGISTRY_URL, berkas itu disajikan dari scripts/registry-base di
// mesin ini — jadi `npm run cli:test` jalan tanpa jaringan dan tanpa
// kliping.pro. REGISTRY_URL yang sudah di-set (CI, uji registry lain) dipakai
// apa adanya.
export default async function setup() {
  if (process.env.REGISTRY_URL)
    return

  const root = resolve(import.meta.dirname, '../../../scripts/registry-base')
  const server = createServer((request, response) => {
    const file = resolve(root, `.${decodeURIComponent(new URL(request.url ?? '/', 'http://x').pathname)}`)
    if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
      response.writeHead(404).end()
      return
    }
    response.writeHead(200, { 'content-type': 'application/json' })
    createReadStream(file).pipe(response)
  })
  await new Promise<void>(done => server.listen(0, '127.0.0.1', done))
  process.env.REGISTRY_URL = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  process.env.NO_PROXY = [process.env.NO_PROXY, '127.0.0.1'].filter(Boolean).join(',')
  process.env.no_proxy = process.env.NO_PROXY

  return () => new Promise<void>(done => server.close(() => done()))
}
