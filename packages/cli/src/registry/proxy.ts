import { EnvHttpProxyAgent } from "undici"

const PROXY_ENV_VARS = ["https_proxy", "HTTPS_PROXY", "http_proxy", "HTTP_PROXY"]

// Shared by every registry fetch so we only build one agent per process.
// `EnvHttpProxyAgent` reads the proxy variables itself and honors
// `NO_PROXY`/`no_proxy`, so registries on localhost or an intranet host are
// fetched directly. `ProxyAgent(https_proxy)` sent every request through
// the proxy.
export const agent = PROXY_ENV_VARS.some(name => process.env[name])
  ? new EnvHttpProxyAgent()
  : undefined
