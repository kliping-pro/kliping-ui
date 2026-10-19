---
title: CLI
description: Memakai CLI kliping untuk menyiapkan project dan menambahkan komponen, block, varian, grafik, serta hook.
---

Selain gunting-tempel manual, semua item Kliping — komponen, block, varian, grafik, dan
hook — bisa dipasang lewat CLI `kliping`. CLI ini di-fork dari CLI shadcn-vue 2.8.2, lalu
diarahkan ke registry Kliping di `https://kliping.pro/r`, sehingga nama polos seperti
`button` atau `hero-01` langsung diambil dari Kliping.

Anda tidak perlu memasang apa pun: jalankan saja lewat `npx` (atau `pnpm dlx`, `yarn dlx`,
`bunx`). CLI-nya butuh **Node.js 22.12 atau lebih baru**.

```bash
npx kliping@latest init
```

::: tip Masih memakai CLI shadcn-vue?
Registry Kliping tetap kompatibel dengan CLI shadcn-vue lewat URL lengkap, misalnya
  `npx shadcn-vue@latest add https://kliping.pro/r/button.json`. Nama polos (`button`,
  `hero-01`) hanya dikenali oleh CLI `kliping`, jadi seluruh dokumentasi ini memakai `kliping`.
:::

## init

Pakai perintah `init` untuk menyiapkan project Anda.

```bash
npx kliping@latest init
```

Yang dikerjakan `init`:

- **Di project Vite (TypeScript maupun JavaScript) atau Nuxt 3/4 yang sudah ada**, `init`
  menyiapkan sendiri Tailwind CSS v4 dan alias import `@` kalau keduanya belum ada — Anda
  tidak perlu menyuntingnya dengan tangan. Hanya bagian yang belum ada yang disentuh.
- Memasang dasar Kliping: helper `cn()` di `lib/utils`, `class-variance-authority`, `clsx`,
  `tailwind-merge`, dan `tw-animate-css`, beserta token tema untuk warna dasar pilihan Anda.
- Menulis `components.json`, termasuk registry `@kliping`.
- **Di folder kosong**, `init` membuat project baru lebih dulu: Vite + TypeScript (bawaan)
  atau Nuxt 4, dari template yang ada di dalam CLI. Pilih lewat `--template`:

```bash
npx kliping@latest init --template nuxt --name my-app
```

Project Tailwind v3 dibiarkan apa adanya. Untuk Astro, Laravel, atau struktur lain, siapkan
Tailwind CSS v4 dan alias `@` sendiri dulu — lihat [Manual Installation](/installation/manual).

::: warning npm 10 dan project Nuxt baru
npm 10 (bawaan Node.js 22) crash dengan pesan `edgesOut` saat memasang project Nuxt 4 baru —
  ini bug npm, `npm create nuxt` pun kena. Pakai pnpm atau perbarui npm:

  ```bash
  pnpm dlx kliping@latest init --template nuxt
  ```
:::

Kalau `components.json` sudah ada, `init` bertanya dulu sebelum menimpanya (atau pakai
`--force`). Tanpa terminal interaktif (misalnya di CI), `init` memakai konfigurasi bawaan.

**Opsi**

```txt
Usage: kliping init [options] [components...]

initialize your project and install dependencies

Arguments:
  components                     names, url or local path to component

Options:
  -p, --preset [preset]          use a preset configuration, preset code, or URL. (vega, nova, maia, lyra, mira, luma, sera)
  -t, --template <template>      the template for a new project. (vite, nuxt)
  --base <base>                  the component library base to use. (reka)
  --style <style>                the visual style to use. (vega, nova, maia, lyra, mira)
  --icon-library <icon-library>  the icon library to use. (lucide, tabler, hugeicons, phosphor, remixicon)
  --font <font>                  the font to use. (inter, figtree, jetbrains-mono, geist, geist-mono)
  -b, --base-color <base-color>  the base color to use. (neutral, gray, zinc, stone, slate)
  -y, --yes                      skip confirmation prompt. (default: true)
  -d, --defaults,                use default configuration. (default: false)
  -f, --force                    force overwrite of existing configuration. (default: false)
  -c, --cwd <cwd>                the working directory. defaults to the current directory.
  -s, --silent                   mute output. (default: false)
  --src-dir                      use the src directory when creating a new project. (default: false)
  --no-src-dir                   do not use the src directory when creating a new project.
  --css-variables                use css variables for theming. (default: true)
  --no-css-variables             do not use css variables for theming.
  --no-base-style                do not install the Kliping base (cn helper and base dependencies).
  -n, --name <name>              the name for the new project.
  --reinstall                    re-install existing UI components.
  --no-reinstall                 do not re-install existing UI components.
  --rtl                          enable RTL support.
  --no-rtl                       disable RTL support.
  --pointer                      enable pointer cursor for buttons.
  --no-pointer                   disable pointer cursor for buttons.
  -h, --help                     display help for command
```

Untuk project baru yang langsung berisi halaman dari block, pakai [`create`](#create).

---

## create

Pakai perintah `create` untuk membuat project baru yang halaman pertamanya sudah berisi
block pilihan Anda — dari nol sampai `npm run dev` dalam satu perintah. Tersedia mulai
`kliping` 0.3.0.

```bash
npx kliping@latest create my-landing navbar-01 hero-03 footer-01
```

Atau ambil susunannya langsung dari tautan [Builder](/builder) (salin lewat **Copy link**):

```bash
npx kliping@latest create --from "https://kliping.pro/builder?n=Landing+page&b=navbar-01,hero-03,footer-01"
```

`create` membuat folder project (nama dari argumen, nama halaman di tautan, atau
`my-landing`), menyiapkan Vite + Tailwind CSS + alias `@`, menjalankan `init`, memasang
block, lalu mengganti halaman sambutan dengan halaman yang merender block sesuai urutan:
`src/App.vue` di Vite, `app/pages/index.vue` di Nuxt (`--template nuxt`).

**Opsi**

```txt
Usage: kliping create [options] [name] [blocks...]

create a new project with the given blocks on its first page

Arguments:
  name                       the folder and package name of the new project.
  blocks                     blocks (or other items) to install, in page order.

Options:
  --from <link>              take the blocks, in order, from a
                             kliping.pro/builder link.
  -t, --template <template>  the template for the new project. (vite, nuxt)
                             (default: "vite")
  -c, --cwd <cwd>            the folder to create the project in. defaults to
                             the current directory.
  -s, --silent               mute output. (default: false)
  -h, --help                 display help for command
```

Sampai `kliping` 0.1.1, `create` adalah nama lain `init`.

---

## add

Pakai perintah `add` untuk menambahkan item beserta dependensinya ke project Anda.

```bash
npx kliping@latest add [item]
```

Beberapa item bisa dipasang sekaligus — komponen, block, varian, grafik, dan hook boleh dicampur:

```bash
npx kliping@latest add button hero-01 button-01 chart-area-axes use-boolean
```

Nama item bisa ditulis dalam beberapa bentuk:

| Bentuk | Merujuk ke |
| --- | --- |
| `button` | item di registry Kliping (`https://kliping.pro/r/button.json`) |
| `@kliping/button` | sama dengan di atas, lewat namespace `@kliping` |
| `@acme/button` | item di registry yang didaftarkan pada `registries` di `components.json` |
| `https://acme.com/r/button.json` | item registry yang diambil langsung dari URL tersebut |
| `./button.json` | item registry yang ada di disk lokal |
| `owner/repo/button` | item di `registry.json` pada root sebuah repository GitHub publik |
| `owner/repo/button#v1.0.0` | sama seperti di atas, tapi dikunci ke branch, tag, atau commit tertentu |

Lihat [Pasang dari GitHub](/registry/getting-started#pasang-dari-github) untuk
penjelasan bentuk GitHub.

Kalau project belum punya `components.json`, `add --yes` menjalankan `init` dengan
konfigurasi bawaan lebih dulu. Berkas yang sudah ada tidak ditimpa tanpa ditanya, kecuali
Anda memakai `--overwrite`.

Dengan `--page`, CLI sekaligus menulis satu halaman yang merender block yang dipasang,
sesuai urutan — halaman yang sama dengan yang Anda susun di [Builder](/builder):

```bash
npx kliping@latest add navbar-01 hero-03 footer-01 --page src/LandingPage.vue
```

Di Vite, render halaman itu dari `App.vue`; di Nuxt, tulis langsung ke `app/pages/index.vue`.
Item tanpa satu berkas utama (hook, helper, komponen majemuk) dilewati dengan catatan, dan
berkas yang sudah ada hanya ditimpa bila ditambah `--overwrite`. Tersedia mulai `kliping` 0.2.0.

**Opsi**

```txt
Usage: kliping add [options] [components...]

add a component to your project

Arguments:
  components          names, url or local path to component

Options:
  -y, --yes           skip confirmation prompt. (default: false)
  -o, --overwrite     overwrite existing files. (default: false)
  -c, --cwd <cwd>     the working directory. defaults to the current directory.
  -a, --all           add all available components (default: false)
  -p, --path <path>   the path to add the component to.
  --page <file>       also write a page (.vue) that renders the added blocks in
                      order, e.g. src/LandingPage.vue.
  -s, --silent        mute output. (default: false)
  --css-variables     use css variables for theming. (default: true)
  --no-css-variables  do not use css variables for theming.
  -h, --help          display help for command
```

`kliping add --help` juga menampilkan `--dry-run`, `--diff`, dan `--view`; ketiganya belum
didukung dan akan menghentikan perintah dengan pesan galat.

---

## diff

Pakai perintah `diff` untuk melihat apa yang berubah antara item yang sudah terpasang dan
versinya di registry. Item dan path berkasnya diselesaikan persis seperti `add`.

```bash
npx kliping@latest diff button
```

**Opsi**

```txt
Usage: kliping diff [options] [component]

check for updates against the registry

Arguments:
  component        the component name

Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

---

## apply

Pakai perintah `apply` untuk menerapkan sebuah preset ke project yang sudah ada.

```bash
npx kliping@latest apply --preset nova
```

**Opsi**

```txt
Usage: kliping apply [options] [preset]

apply a preset to an existing project

Arguments:
  preset             the preset to apply

Options:
  --preset <preset>  preset configuration to apply
  -y, --yes          skip confirmation prompt. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -s, --silent       mute output. (default: false)
  -h, --help         display help for command
```

---

## view

Pakai perintah `view` untuk melihat isi item registry sebelum benar-benar memasangnya.

```bash
npx kliping@latest view [item]
```

Beberapa item bisa dilihat sekaligus:

```bash
npx kliping@latest view button card hero-01
```

Atau melihat item dari registry ber-namespace:

```bash
npx kliping@latest view @kliping/use-boolean @acme/auth
```

**Opsi**

```txt
Usage: kliping view [options] <items...>

view items from the registry

Arguments:
  items            the item names or URLs to view

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

---

## search

Pakai perintah `search` untuk mencari item. Tanpa nama registry, yang dicari registry
Kliping:

```bash
npx kliping@latest search hero
```

Yang muncul hanya item yang nama atau keterangannya memuat **semua** kata yang Anda
ketik; nama yang paling cocok di atas. Salah ketik (`pricng`) tetap menemukan yang
dimaksud lewat pencocokan longgar. Hasilnya tabel singkat — nama, jenis, keterangan —
dan contoh perintah `add` di bawahnya.

Registry lain ditulis dengan awalan `@` (atau URL, atau `owner/repo` GitHub):

```bash
npx kliping@latest search @kliping @acme -q "login"
```

Untuk skrip dan alat lain, `--json` menulis hasil lengkap sebagai JSON. Perintah `list`
adalah alias dari `search`.

**Opsi**

```txt
Usage: kliping search|list [options] [query-or-registries...]

search items from registries (the Kliping registry by default)

Arguments:
  query-or-registries    words to search for, and/or registries (@name, url or
                         owner/repo). Defaults to @kliping.

Options:
  -c, --cwd <cwd>        the working directory. defaults to the current
                         directory.
  -q, --query <query>    query string
  -l, --limit <number>   maximum number of items to display (default: 20; 100
                         with --json)
  -o, --offset <number>  number of items to skip (default: "0")
  --json                 print the raw results as JSON (for scripts and tools)
                         (default: false)
  -h, --help             display help for command
```

---

## build

Pakai perintah `build` untuk menghasilkan file JSON registry Anda sendiri.

```bash
npx kliping@latest build
```

Perintah ini membaca file `registry.json` lalu menghasilkan file-file JSON registry di folder `public/r`.

**Opsi**

```txt
Usage: kliping build [options] [registry]

build components for a registry

Arguments:
  registry             path to registry.json file (default: "./registry.json")

Options:
  -o, --output <path>  destination directory for json files (default: "./public/r")
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -h, --help           display help for command
```

Untuk mengubah folder tujuan, pakai opsi `--output`.

```bash
npx kliping@latest build --output ./public/registry
```

---

## docs

Pakai perintah `docs` untuk mendapatkan tautan dokumentasi sebuah item di situs Kliping.

```bash
npx kliping@latest docs [component]
```

**Opsi**

```txt
Usage: kliping docs [options] <components...>

get docs, api references and usage examples for components

Arguments:
  components         component names

Options:
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -b, --base <base>  the base to use (reka). defaults to project base.
  --json             output as JSON. (default: false)
  -h, --help         display help for command
```

---

## info

Pakai perintah `info` untuk melihat informasi tentang project Anda.

```bash
npx kliping@latest info
```

**Opsi**

```txt
Usage: kliping info [options]

get information about your project

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  --json           output as JSON. (default: false)
  -h, --help       display help for command
```

---

## mcp

Pakai perintah `mcp` untuk menjalankan server MCP Kliping, dan `mcp init` untuk menulis
konfigurasinya ke editor Anda. Penjelasan lengkapnya ada di [Server MCP](/mcp).

```bash
npx kliping@latest mcp init --client claude
```

**Opsi**

```txt
Usage: kliping mcp init [options]

Initialize MCP configuration for your client

Options:
  --client <client>  MCP client (claude, cursor, vscode, codex, opencode)
  -h, --help         display help for command
```

---

## migrate

Pakai perintah `migrate` untuk menjalankan migrasi pada project Anda.

```bash
npx kliping@latest migrate [migration]
```

**Migrasi yang tersedia**

| Migrasi | Keterangan                                                   |
| ------- | ------------------------------------------------------------ |
| `icons` | Memindahkan komponen UI Anda ke library ikon yang berbeda.   |
| `rtl`   | Menyesuaikan komponen Anda agar mendukung RTL (kanan ke kiri). |

**Opsi**

```txt
Usage: kliping migrate [options] [migration] [path]

run a migration.

Arguments:
  migration        the migration to run.
  path             optional path or glob pattern to migrate.

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -l, --list       list all migrations. (default: false)
  -y, --yes        skip confirmation prompt. (default: false)
  -h, --help       display help for command
```

---

### migrate rtl

Migrasi `rtl` mengubah komponen Anda agar mendukung bahasa yang ditulis dari kanan ke kiri.

```bash
npx kliping@latest migrate rtl
```

Yang dilakukan migrasi ini:

1. Memperbarui `components.json` menjadi `rtl: true`.
2. Mengubah properti CSS fisik menjadi padanan logisnya (misalnya `ml-4` → `ms-4`, `text-left` → `text-start`).
3. Menambahkan varian `rtl:` di tempat yang membutuhkannya (misalnya `space-x-4` → `space-x-4 rtl:space-x-reverse`).

**Migrasi file tertentu**

Anda bisa memigrasikan file tertentu, atau memakai pola glob:

```bash
# Migrasikan satu file tertentu
npx kliping@latest migrate rtl src/components/ui/button/button.vue

# Migrasikan semua file yang cocok dengan pola glob
npx kliping@latest migrate rtl "src/components/ui/**"
```

Kalau path tidak diisi, migrasi akan mengubah seluruh file di folder `ui` Anda (sesuai `components.json`).

---

## Variabel lingkungan

| Variabel | Kegunaan |
| --- | --- |
| `KLIPING_URL` | Alamat situs Kliping (bawaan `https://kliping.pro`). |
| `REGISTRY_URL` | Alamat registry (bawaan `${KLIPING_URL}/r`), misalnya registry lokal saat mengembangkan. |

`NO_PROXY` dihormati: registry di `localhost` atau host intranet tidak dikirim lewat proxy.
