<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ChartConfig } from "."
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{
  /** Hides the tooltip heading label. */
  hideLabel?: boolean
  /** Hides the color indicator next to each series that has no icon. */
  hideIndicator?: boolean
  /** Shape of the series color indicator: `dot` (default), `line`, or `dashed`. */
  indicator?: "line" | "dot" | "dashed"
  /** Data field whose value names the config entry for label and color, e.g. `browser` → `config.chrome` (pie charts). */
  nameKey?: string
  /** Config or payload key whose label/value is shown as the tooltip heading instead of `x`. */
  labelKey?: string
  /** Formats `x` into the tooltip heading when `x` is set. */
  labelFormatter?: (d: number | Date) => string
  /** Data point values keyed by series; only keys present in `config` are listed. */
  payload?: Record<string, any>
  /** Series config used for labels, icons, and indicator colors. */
  config?: ChartConfig
  class?: HTMLAttributes["class"]
  /** Indicator color for every series, overriding the config colors. */
  color?: string
  /** Hovered x value, used as the default heading and passed to `labelFormatter`. */
  x?: number | Date
}>(), {
  payload: () => ({}),
  config: () => ({}),
  indicator: "dot",
})

// Baris tooltip = field data yang punya entri di `config` (seri). Dengan
// `nameKey`, label dan warnanya diambil dari entri config yang dinamai nilai
// field itu — pola pie chart: `{ browser: "chrome", visitors: 275 }` dengan
// `nameKey: "browser"` → label & warna `config.chrome`, nilai 275.
const payload = computed(() => {
  const named = props.nameKey ? props.payload[props.nameKey] : undefined
  const namedConfig = typeof named === "string" ? props.config[named] : undefined

  return Object.entries(props.payload)
    .filter(([key]) => props.config[key])
    .map(([key, value]) => {
      const itemConfig = namedConfig ?? props.config[key]
      const indicatorColor = props.color ?? itemConfig.color ?? props.payload.fill

      return { key, value, itemConfig, indicatorColor }
    })
})

const nestLabel = computed(() => Object.keys(props.payload).length === 1 && props.indicator !== "dot")
const tooltipLabel = computed(() => {
  if (props.hideLabel)
    return null
  if (props.labelFormatter && props.x !== undefined) {
    return props.labelFormatter(props.x)
  }
  return props.labelKey ? props.config[props.labelKey]?.label || props.payload[props.labelKey] : props.x
})
</script>

<template>
  <div
    :class="cn(
      'border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
      props.class,
    )"
  >
    <slot>
      <div v-if="!nestLabel && tooltipLabel" class="font-medium">
        {{ tooltipLabel }}
      </div>
      <div class="grid gap-1.5">
        <div
          v-for="{ value, itemConfig, indicatorColor, key } in payload"
          :key="key"
          :class="
            cn('[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
               indicator === 'dot' && 'items-center')"
        >
          <component :is="itemConfig.icon" v-if="itemConfig?.icon" />
          <template v-else-if="!hideIndicator">
            <div
              :class="cn(
                'shrink-0 rounded-xs border-(--color-border) bg-(--color-bg)',
                {
                  'h-2.5 w-2.5': indicator === 'dot',
                  'w-1': indicator === 'line',
                  'w-0 border-[1.5px] border-dashed bg-transparent':
                    indicator === 'dashed',
                  'my-0.5': nestLabel && indicator === 'dashed',
                },
              )"
              :style="{
                '--color-bg': indicatorColor,
                '--color-border': indicatorColor,
              }"
            />
          </template>

          <div :class="cn('flex flex-1 justify-between leading-none', nestLabel ? 'items-end' : 'items-center')">
            <div class="grid gap-1.5">
              <div v-if="nestLabel" class="font-medium">
                {{ tooltipLabel }}
              </div>
              <span class="text-muted-foreground">
                {{ itemConfig?.label || value }}
              </span>
            </div>
            <span v-if="value" class="text-foreground font-mono font-medium tabular-nums">
              {{ value.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
