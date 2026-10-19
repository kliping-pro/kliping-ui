import type { AddressInfo } from "node:net"
import { createServer } from "node:http"
import { ofetch } from "ofetch"
import { EnvHttpProxyAgent } from "undici"
import { afterEach, describe, expect, it, vi } from "vitest"

const PROXY_VARS = [
  "https_proxy",
  "HTTPS_PROXY",
  "http_proxy",
  "HTTP_PROXY",
  "no_proxy",
  "NO_PROXY",
]

async function loadAgent(env: Record<string, string>) {
  for (const name of PROXY_VARS) {
    vi.stubEnv(name, env[name])
  }
  vi.resetModules()
  const { agent } = await import("@/src/registry/proxy")
  return agent
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("registry proxy agent", () => {
  it("is not created without proxy variables", async () => {
    expect(await loadAgent({})).toBeUndefined()
  })

  it.each(PROXY_VARS.slice(0, 4))("is created from %s", async (name) => {
    const agent = await loadAgent({ [name]: "http://127.0.0.1:9" })
    expect(agent).toBeInstanceOf(EnvHttpProxyAgent)
  })

  it("bypasses the proxy for hosts listed in NO_PROXY", async () => {
    const server = createServer((_, res) => {
      res.setHeader("content-type", "application/json")
      res.end(JSON.stringify({ name: "button" }))
    })
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve))
    const { port } = server.address() as AddressInfo

    try {
      // Port 9 (discard) refuses connections: going through the proxy fails.
      const agent = await loadAgent({
        https_proxy: "http://127.0.0.1:9",
        http_proxy: "http://127.0.0.1:9",
        NO_PROXY: "localhost,127.0.0.1",
      })
      const result = await ofetch(`http://127.0.0.1:${port}/r/button.json`, {
        dispatcher: agent,
      } as Parameters<typeof ofetch>[1])
      expect(result).toEqual({ name: "button" })
    }
    finally {
      server.close()
    }
  })
})
