import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import HomePage from './HomePage.vue'
import BlockViewer from './BlockViewer.vue'
import VariantItem from './VariantItem.vue'
import TemplateCard from './TemplateCard.vue'
import BlockCanvas from './BlockCanvas.vue'
import BlockGallery from './BlockGallery.vue'
import ComponentPreview from './ComponentPreview.vue'
import ComponentSource from './ComponentSource.vue'
import ComponentsList from './ComponentsList.vue'
import HooksList from './HooksList.vue'
import AllHooks from './pages/AllHooks.vue'
import InstallCLI from './InstallCLI.vue'
import PackageCommand from './PackageCommand.vue'
import ScaledPreview from './ScaledPreview.vue'
import VariantIcon from './VariantIcon.vue'
import AllBlocks from './pages/AllBlocks.vue'
import BlockDetail from './pages/BlockDetail.vue'
import BlockGrid from './pages/BlockGrid.vue'
import NativeClassCallout from './NativeClassCallout.vue'
import Layout from './Layout.vue'
import LinkedCard from './LinkedCard.vue'
import RegistryDirectory from './RegistryDirectory.vue'
import BlockPage from './pages/BlockPage.vue'
import VariantPage from './pages/VariantPage.vue'
import TemplatePage from './pages/TemplatePage.vue'
import HooksPage from './pages/HooksPage.vue'
import ChartPage from './pages/ChartPage.vue'
import TypesetPage from './pages/TypesetPage.vue'
import TypesetStandalone from './pages/typeset/TypesetStandalone.vue'
import ColorsPage from './pages/ColorsPage.vue'
import PageBuilder from './pages/PageBuilder.vue'
import Steps from './Steps.vue'
import TabItem from './TabItem.vue'
import Tabs from './Tabs.vue'

// Token tema dan preflight Tailwind yang sama dengan yang dipakai komponennya,
// supaya pratinjau di dokumentasi tampil persis seperti di aplikasi.
import '@/assets/main.css'
import './kliping.css'

/**
 * `extends: DefaultTheme` dipertahankan, tapi `Layout`-nya diganti seluruhnya.
 *
 * Yang masih diambil dari tema bawaan cuma satu hal: penataan prosa dan blok
 * kode di dalam `.vp-doc` — tipografi markdown, tabel, container `::: tip`,
 * penomoran baris, tombol salin. Menulis ulang semua itu tidak akan membuat
 * halamannya lebih mirip shadcn-vue; yang membuatnya mirip adalah kerangkanya,
 * dan kerangkanya sudah milik kita.
 *
 * Warnanya tetap warna Kliping: `kliping.css` memetakan token `--vp-*` yang
 * dipakai penataan itu ke token shadcn. Jadi tidak ada dua palet yang berjalan
 * paralel — yang ada satu palet dengan satu lapis nama lama di depannya.
 */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Didaftarkan global karena markdown memanggilnya langsung tanpa import.
    app.component('ComponentPreview', ComponentPreview)
    app.component('Steps', Steps)
    app.component('PageBuilder', PageBuilder)
    app.component('BlockCanvas', BlockCanvas)
    app.component('BlockGallery', BlockGallery)
    app.component('HomePage', HomePage)
    app.component('LinkedCard', LinkedCard)
    app.component('ComponentsList', ComponentsList)
    app.component('HooksList', HooksList)
    app.component('AllHooks', AllHooks)
    app.component('InstallCLI', InstallCLI)
    app.component('PackageCommand', PackageCommand)
    app.component('ScaledPreview', ScaledPreview)
    app.component('VariantIcon', VariantIcon)
    app.component('AllBlocks', AllBlocks)
    app.component('BlockDetail', BlockDetail)
    app.component('BlockGrid', BlockGrid)
    app.component('NativeClassCallout', NativeClassCallout)
    app.component('ComponentSource', ComponentSource)
    app.component('RegistryDirectory', RegistryDirectory)
    app.component('Tabs', Tabs)
    app.component('TabItem', TabItem)

    // Halaman lepas: Blocks, Grafik, Warna, Typeset.
    app.component('BlockViewer', BlockViewer)
    app.component('BlockPage', BlockPage)
    app.component('VariantPage', VariantPage)
    app.component('VariantItem', VariantItem)
    app.component('TemplatePage', TemplatePage)
    app.component('TemplateCard', TemplateCard)
    app.component('ChartPage', ChartPage)
    app.component('ColorsPage', ColorsPage)
    app.component('TypesetPage', TypesetPage)
    app.component('TypesetStandalone', TypesetStandalone)
    app.component('HooksPage', HooksPage)

    // Dipakai daftar tanya jawab di halaman Pengenalan. Di Nuxt Content
    // komponen ini tersedia otomatis lewat MDC; di sini harus didaftarkan.
    app.component('Accordion', Accordion)
    app.component('AccordionItem', AccordionItem)
    app.component('AccordionTrigger', AccordionTrigger)
    app.component('AccordionContent', AccordionContent)
  },
} satisfies Theme
