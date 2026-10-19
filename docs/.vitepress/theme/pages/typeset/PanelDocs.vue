<script setup lang="ts">
import type { Framework } from './code'
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { useClipboard } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PackageCommand from '../../PackageCommand.vue'
import { useTypeset } from './state'
import {
  hasWebFonts,
  cssFile,
  cssFontsource,
  fullPresetCss,
  cssVariables,
  FRAMEWORK,
  CSS_IMPORTS,
  nuxtFontsCode,
  wrapperCode,
  fontsourceInstallCommand,
  promptText,
} from './code'
import TypesetCode from './TypesetCode.vue'

/**
 * Panel kanan: cara membawa rancangan yang sedang dilihat ke project pembaca.
 *
 * Tab Docs berisi langkah pemasangan yang kodenya dibuat dari setelan saat
 * ini; tab Prompt merangkum langkah yang sama jadi satu prompt untuk agen
 * pemrograman. Keduanya mengikuti framework yang dipilih di kanan atas.
 */
const { settings } = useTypeset()

const framework = ref<Framework>('nuxt')
const nuxt = computed(() => framework.value === 'nuxt')

// Asal situs baru diketahui di peramban; server merender alamat produksinya.
const siteOrigin = ref('https://kliping.pro')

// Isi stylesheet diambil dari berkas yang sama yang disajikan situs, jadi yang
// disalin selalu byte demi byte berkas yang disebut dokumentasinya.
const stylesheet = ref('')

onMounted(async () => {
  siteOrigin.value = window.location.origin
  try {
    const response = await fetch(withBase('/typeset.css'))
    if (response.ok)
      stylesheet.value = await response.text()
  }
  catch {}
})

const hasWebFont = computed(() => hasWebFonts(settings))
const nuxtCode = computed(() => nuxtFontsCode(settings))
const variablesCss = computed(() => cssVariables(settings, framework.value))
const installCommand = computed(() => fontsourceInstallCommand(settings))
const importsCss = computed(() => cssFontsource(settings, framework.value))
const preset = computed(() => fullPresetCss(settings, framework.value))
const wrapper = computed(() => wrapperCode(settings))
const prompt = computed(() => promptText(settings, framework.value, siteOrigin.value))

// Digulir sendiri, bukan diserahkan ke router: query setelan yang ditulis
// lewat `replaceState` harus tetap utuh di URL-nya.
function scrollToDocs() {
  document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#docs`)
}

const copyCss = useClipboard({ copiedDuring: 2000, legacy: true })
const copyPrompt = useClipboard({ copiedDuring: 2000, legacy: true })

const headingClass = 'text-sm font-medium'
const textClass = 'text-muted-foreground text-sm leading-relaxed'
const codeClass = 'rounded bg-muted px-1 py-0.5 font-mono text-[0.8125rem] text-foreground'
</script>

<template>
  <div class="flex min-h-0 w-full flex-col items-start gap-2">
    <Tabs
      default-value="docs"
      class="flex min-h-0 w-full flex-1 flex-col gap-0 overflow-hidden rounded-lg border bg-background"
    >
      <div class="flex shrink-0 items-center justify-between gap-2 border-b p-2">
        <TabsList>
          <TabsTrigger value="docs" class="px-3">
            Docs
          </TabsTrigger>
          <TabsTrigger value="prompt" class="px-3">
            Prompt
          </TabsTrigger>
        </TabsList>
        <Select v-model="framework">
          <SelectTrigger size="sm" class="rounded-lg" aria-label="Framework">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" class="rounded-lg">
            <SelectGroup>
              <SelectItem v-for="f in FRAMEWORK" :key="f.value" :value="f.value">
                {{ f.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="scrollbar-none min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
        <TabsContent value="docs" class="flex flex-col gap-7">
          <section class="flex flex-col gap-2.5">
            <h3 :class="headingClass">
              1. Create typeset.css
            </h3>
            <p :class="textClass">
              Copy the stylesheet into a <code :class="codeClass">typeset.css</code> file next to
              <code :class="codeClass">{{ cssFile(framework) }}</code>, then import it:
            </p>
            <Button
              variant="outline"
              size="sm"
              class="w-fit rounded-lg"
              :disabled="!stylesheet"
              @click="copyCss.copy(stylesheet)"
            >
              <CheckIcon v-if="copyCss.copied.value" />
              <CopyIcon v-else />
              {{ copyCss.copied.value ? 'Copied' : 'Copy typeset.css' }}
            </Button>
            <TypesetCode :code="CSS_IMPORTS" lang="css" />
          </section>

          <section class="flex flex-col gap-2.5">
            <h3 :class="headingClass">
              2. Add the fonts
            </h3>
            <template v-if="nuxt">
              <template v-if="hasWebFont">
                <p :class="textClass">
                  Register the families with <code :class="codeClass">@nuxt/fonts</code>:
                </p>
                <TypesetCode :code="nuxtCode" lang="ts" />
                <p :class="textClass">
                  Then declare the variables in your CSS file:
                </p>
              </template>
              <!-- Hanya fon sistem: tidak ada yang didaftarkan, tapi preset di
                   langkah 3 tetap menyebut variabelnya. -->
              <p v-else :class="textClass">
                System fonts need nothing registered with <code :class="codeClass">@nuxt/fonts</code>.
                Declare the variables in your CSS file:
              </p>
              <TypesetCode :code="variablesCss" lang="css" />
            </template>
            <template v-else>
              <template v-if="installCommand">
                <p :class="textClass">
                  Install the families from Fontsource:
                </p>
                <PackageCommand :command="installCommand" class="my-0!" />
                <p :class="textClass">
                  Then import them and declare the variables in your CSS file:
                </p>
              </template>
              <p v-else :class="textClass">
                System fonts need nothing installed. Declare the variables in your CSS file:
              </p>
              <TypesetCode :code="importsCss" lang="css" />
            </template>
          </section>

          <section class="flex flex-col gap-2.5">
            <h3 :class="headingClass">
              3. Create your custom typeset
            </h3>
            <p :class="textClass">
              A preset class holding the choices on the left. Add it after the typeset import:
            </p>
            <TypesetCode :code="preset" lang="css" />
          </section>

          <section class="flex flex-col gap-2.5">
            <h3 :class="headingClass">
              4. Wrap your content
            </h3>
            <p :class="textClass">
              <code :class="codeClass">typeset</code> turns the styles on, the preset sets the rhythm, and
              the max width is your measure:
            </p>
            <TypesetCode :code="wrapper" lang="vue" />
          </section>
        </TabsContent>

        <TabsContent value="prompt" class="flex flex-col gap-3">
          <p :class="textClass">
            One prompt with your picks baked in. Copy it and paste it into your coding agent.
          </p>
          <TypesetCode :code="prompt" wrap class="max-h-96 overflow-y-auto" />
          <Button variant="outline" size="sm" class="w-fit rounded-lg" @click="copyPrompt.copy(prompt)">
            <CheckIcon v-if="copyPrompt.copied.value" />
            <CopyIcon v-else />
            {{ copyPrompt.copied.value ? 'Copied' : 'Copy Prompt' }}
          </Button>
        </TabsContent>
      </div>
    </Tabs>

    <a
      href="#docs"
      @click.prevent="scrollToDocs"
      class="text-muted-foreground hover:text-foreground rounded-lg px-2 py-1 text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
    >
      Read the docs
    </a>
  </div>
</template>
