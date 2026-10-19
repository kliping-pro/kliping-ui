import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import { REGISTRY_URL } from "@/src/registry/constants"
import { resolveRegistryItems } from "./api"

vi.mock("@/src/utils/handle-error", () => ({
  handleError: vi.fn(),
}))

function item(name: string, registryDependencies: string[] = []) {
  return {
    name,
    type: "registry:ui",
    registryDependencies,
    files: [
      {
        path: `registry/kliping/ui/${name}/${name}.vue`,
        content: `<template><div>${name}</div></template>`,
        type: "registry:ui",
      },
    ],
  }
}

// `calendar` and `input-group` both need `button`: a diamond, not a cycle.
// `ping` and `pong` need each other: a real cycle.
const ITEMS = [
  item("button"),
  item("input"),
  item("calendar", ["@kliping/button"]),
  item("input-group", ["@kliping/button", "@kliping/input"]),
  item("ping", ["@kliping/pong"]),
  item("pong", ["@kliping/ping"]),
]

const server = setupServer(
  ...ITEMS.map(entry =>
    http.get(`${REGISTRY_URL}/${entry.name}.json`, () =>
      HttpResponse.json(entry)),
  ),
)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => {
  server.resetHandlers()
  vi.restoreAllMocks()
})
afterAll(() => server.close())

describe("resolveRegistryTree ordering", () => {
  it("does not report a cycle when one item is shared by several others", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})

    const tree = await resolveRegistryItems([
      "@kliping/calendar",
      "@kliping/input-group",
    ])

    expect(warn).not.toHaveBeenCalled()
    expect(tree?.files?.map(file => file.path).sort()).toEqual([
      "registry/kliping/ui/button/button.vue",
      "registry/kliping/ui/calendar/calendar.vue",
      "registry/kliping/ui/input-group/input-group.vue",
      "registry/kliping/ui/input/input.vue",
    ])
  })

  it("resolves plain names from the registry root", async () => {
    const tree = await resolveRegistryItems(["calendar"])

    expect(tree?.files?.map(file => file.path).sort()).toEqual([
      "registry/kliping/ui/button/button.vue",
      "registry/kliping/ui/calendar/calendar.vue",
    ])
  })

  it("still reports a real cycle", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})

    await resolveRegistryItems(["@kliping/ping"])

    expect(warn).toHaveBeenCalledWith(
      "Circular dependency detected in registry items",
    )
  })
})
