/**
 * Katalog template.
 *
 * `src/registry/templates.json` disusun sekali oleh alat impor sekali pakai
 * (`skrip/angkut-template.mjs`, dihapus di 7a4be01 — ada di riwayat git) dari
 * `scripts/template-sources.json`. Sejak itu keduanya disunting tangan: menambah
 * atau mengubah template berarti menyunting `templates.json` (dan entri yang
 * sama di `template-sources.json`), bukan di sini dan bukan di tiap `page.vue`.
 */
import templateList from '@/registry/templates.json'

export interface TemplateLicense {
  /** License name, or `not stated` when the source repo does not name one. */
  type: string
  copyright: string
  file: string | null
}

export interface Template {
  /** Folder name under `src/templates/`, e.g. `homeguardian`. */
  slug: string
  name: string
  /** Category slug, e.g. `landing-page` or `portfolio`. */
  category: string
  description: string
  /** Page sections, top to bottom. */
  sections: string[]
  /** Source repo, credited because its license requires it. */
  repo: string
  /** The author's live preview. */
  url: string
  /**
   * Status lisensi repo asalnya, dicatat apa adanya.
   *
   * Hanya satu dari keempatnya menyertakan berkas LICENSE. Yang lain tidak
   * menyebutkan lisensi sama sekali, dan itu bukan hal yang boleh disamarkan:
   * tanpa lisensi, hak ciptanya sepenuhnya dipegang penulisnya.
   */
  license: TemplateLicense
}

/** Value of `license.type` for a source repo that names no license. */
const LICENSE_UNSTATED = 'not stated'

/** Template yang repo asalnya menyebutkan lisensinya. */
export function isLicensed(t: Template) {
  return t.license.type !== LICENSE_UNSTATED
}

export const allTemplates: Template[] = templateList

export const TEMPLATE_CATEGORY_TITLES: Record<string, string> = {
  'landing-page': 'Landing Page',
  'portfolio': 'Portfolio',
}

/** Categories that have templates, in catalog order. */
export const templateCategories = [...new Set(allTemplates.map(t => t.category))]
  .map(slug => ({ slug, name: TEMPLATE_CATEGORY_TITLES[slug] ?? slug }))

export function templatesIn(category: string) {
  return allTemplates.filter(t => t.category === category)
}

export function findTemplate(slug: string) {
  return allTemplates.find(t => t.slug === slug)
}
