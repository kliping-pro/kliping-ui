---
title: MCP Server
description: Memakai server MCP Kliping untuk menelusuri, mencari, dan memasang item dari registry.
---

Server MCP memungkinkan asisten AI berinteraksi dengan item di dalam registry. Anda bisa menelusuri komponen, block, varian, grafik, dan hook yang tersedia, mencari yang spesifik, dan memasangnya langsung ke project — cukup lewat bahasa sehari-hari.

Server ini ikut di dalam CLI `kliping` (`npx kliping@latest mcp`). Contohnya, Anda bisa meminta asisten AI: "Bangun halaman landing memakai block hero dari registry Kliping" atau "Carikan form login dari registry Kliping".

Registry `@kliping` sudah tertanam di CLI. Registry lain diatur di berkas `components.json` project Anda.

```json:line-numbers [components.json]
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

::: tip Gratis, tanpa akun
Server MCP Kliping berjalan di komputer Anda, dijalankan oleh editor atau agen Anda sendiri,
dan hanya membaca berkas statis di `https://kliping.pro/r`. Tidak ada login, kunci API, atau
variabel lingkungan untuk Kliping. Model AI-nya (Claude, GPT, …) adalah langganan Anda
sendiri — Kliping tidak memanggil model apa pun dan tidak memungut biaya.
:::

---

## Mulai Cepat

Pilih klien MCP yang Anda pakai, lalu ikuti langkah pengaturan server MCP-nya. Kalau Anda ingin mengaturnya sendiri secara manual, lihat bagian [Konfigurasi](#konfigurasi).

<Tabs>

<TabItem value="claude" label="Claude Code">

**Jalankan perintah berikut** di project Anda:

```bash
npx kliping@latest mcp init --client claude
```

**Mulai ulang Claude Code**, lalu coba perintah berikut:
- Tunjukkan semua block hero yang tersedia di registry Kliping
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry Kliping

**Catatan:** perintah `/mcp` di Claude Code bisa Anda pakai untuk men-debug server MCP-nya.

</TabItem>

<TabItem value="cursor" label="Cursor">

**Jalankan perintah berikut** di project Anda:

```bash
npx kliping@latest mcp init --client cursor
```

Buka **Cursor Settings** lalu **aktifkan server MCP**-nya. Setelah itu coba perintah berikut:
- Tunjukkan semua block hero yang tersedia di registry Kliping
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry Kliping

</TabItem>

<TabItem value="vscode" label="VS Code">

**Jalankan perintah berikut** di project Anda:

```bash
npx kliping@latest mcp init --client vscode
```

Buka `.vscode/mcp.json` lalu klik **Start** di samping server-nya. Setelah itu coba perintah berikut lewat GitHub Copilot:
- Tunjukkan semua block hero yang tersedia di registry Kliping
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry Kliping

</TabItem>

<TabItem value="codex" label="Codex">

::: tip 
**Catatan:** CLI `kliping` tidak memperbarui `~/.codex/config.toml` secara otomatis. Untuk Codex, perintah di bawah hanya memasang paketnya dan menampilkan konfigurasi yang perlu Anda tambahkan sendiri.

**Jalankan perintah berikut** di project Anda:

```bash
npx kliping@latest mcp init --client codex
```

**Lalu tambahkan konfigurasi berikut** ke `~/.codex/config.toml`:

```toml:line-numbers [~/.codex/config.toml]
[mcp_servers.kliping]
command = "npx"
args = ["kliping@latest", "mcp"]
```

**Mulai ulang Codex**, lalu coba perintah berikut:
- Tunjukkan semua block hero yang tersedia di registry Kliping
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry Kliping
:::

</TabItem>

<TabItem value="opencode" label="Opencode">

Pastikan opencode sudah terpasang. Cara memasangnya ada di [dokumentasi Opencode](https://opencode.ai/).

**Jalankan perintah berikut** di project Anda:
```bash
npx kliping@latest mcp init --client opencode
```
**Mulai ulang opencode**, lalu coba perintah berikut:
- Tunjukkan semua block hero yang tersedia di registry Kliping
- Tambahkan komponen button, dialog, dan card ke project saya
- Buatkan form kontak memakai komponen dari registry Kliping

**Catatan:** tekan `Ctrl+x s` untuk melihat status server MCP-nya.

</TabItem>

</Tabs>

---

## Apa Itu MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) adalah protokol terbuka yang memungkinkan asisten AI terhubung secara aman ke sumber data dan tool di luar dirinya. Lewat server MCP ini, asisten AI Anda mendapat akses langsung untuk:

- **Menelusuri komponen** — melihat semua komponen, block, dan template yang tersedia di registry mana pun yang sudah diatur.
- **Mencari lintas registry** — menemukan item tertentu berdasarkan nama atau fungsinya di beberapa sumber sekaligus.
- **Memasang lewat bahasa sehari-hari** — menambahkan komponen cukup dengan kalimat biasa, misalnya "tambahkan form login".
- **Mendukung banyak registry** — mengakses registry publik, pustaka internal perusahaan, maupun sumber pihak ketiga.

---

## Cara Kerjanya

Contoh: di chat agen Anda (Claude Code, Cursor, Copilot, …) Anda mengetik
**"Buatkan halaman dashboard dari komponen Kliping"**.

1. **Agen mencari di katalog Kliping** — lewat alat MCP `search_items_in_registries`
   ("dashboard", "sidebar", "chart", "table"). Hasilnya nama item, keterangannya, dan
   perintah pasangnya.
2. **Agen memilih dan membaca** — `view_items_in_registries` menunjukkan isi berkas tiap
   kandidat (misalnya `dashboard-01`, `sidebar-07`, `stats-01`, `chart-area-interactive`),
   `get_item_examples_from_registries` memberi contoh pemakaiannya.
3. **Agen memasang** — ia menjalankan `npx kliping@latest add dashboard-01 stats-01 …` di
   terminal project Anda (biasanya setelah Anda izinkan). Kode sumbernya masuk ke
   `components/` project Anda — milik Anda, bukan paket tertutup.
4. **Agen merakit halaman** — menulis halaman yang memakai block tadi (atau
   `add … --page src/DashboardPage.vue`), menyambung rute bila ada beberapa halaman,
   dan mengganti teks contohnya sesuai permintaan Anda.
5. **Anda menjalankan** `npm run dev` dan melihat hasilnya; minta perubahan lewat chat
   yang sama.

Yang perlu diketahui:

- **Front-end saja.** Block membawa data contoh (angka, nama, grafik). Menyambungkannya ke
  API atau database Anda adalah langkah berikutnya — minta agen melakukannya di project Anda.
- **Bahan kurasi, bukan UI acak.** Varian (gaya siap pakai satu komponen) → block (satu
  section halaman) → halaman (block yang ditumpuk). Agen menyusun dari tingkat yang sudah
  ada, jadi hasilnya konsisten dengan tema Anda.
- **Susun manual juga bisa** — di [Builder](/builder) Anda menumpuk block dengan seret-lepas
  lalu menyalin satu perintah yang sama.

---

## Tanpa MCP: llms.txt

Agen yang tidak mendukung MCP (misalnya chat di peramban) bisa membaca
[`https://kliping.pro/llms.txt`](https://kliping.pro/llms.txt): satu berkas teks berisi cara
memasang dan seluruh item registry — komponen, block per kategori, varian per komponen,
grafik, dan hook — beserta keterangan dan tautan JSON-nya. Tempelkan tautannya di chat,
misalnya: "Baca https://kliping.pro/llms.txt, lalu buatkan halaman harga memakai block
Kliping." Berkasnya disusun ulang setiap kali situs dibangun, jadi selalu sama dengan registry.

---

## Registry yang Didukung

Server MCP ini langsung bisa dipakai dengan registry mana pun yang kompatibel.

- **Registry bawaan** — `@kliping`, berisi seluruh komponen, block, varian, grafik, dan hook Kliping.
- **Registry pihak ketiga** — registry mana pun yang mengikuti spesifikasi registry shadcn.
- **Registry privat** — pustaka komponen internal perusahaan Anda.
- **Registry ber-namespace** — beberapa registry sekaligus, diatur lewat sintaks `@namespace`.

---

## Konfigurasi

Klien MCP mana pun bisa Anda pakai untuk berinteraksi dengan server ini. Berikut langkahnya untuk yang paling populer.

### Claude Code

Untuk memakai server MCP ini di Claude Code, tambahkan konfigurasi berikut ke berkas `.mcp.json` project Anda:

```json:line-numbers [.mcp.json]
{
  "mcpServers": {
    "kliping": {
      "command": "npx",
      "args": ["kliping@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, mulai ulang Claude Code lalu jalankan `/mcp` untuk melihat server-nya di daftar. Kalau statusnya `Connected`, berarti sudah siap.

Detail selengkapnya ada di [dokumentasi MCP Claude Code](https://docs.anthropic.com/en/docs/claude-code/mcp).

### Cursor

Untuk mengatur MCP di Cursor, tambahkan server-nya ke berkas konfigurasi `.cursor/mcp.json` project Anda:

```json:line-numbers [.cursor/mcp.json]
{
  "mcpServers": {
    "kliping": {
      "command": "npx",
      "args": ["kliping@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, aktifkan server MCP-nya lewat Cursor Settings.

Begitu aktif, akan muncul titik hijau di samping nama server-nya pada daftar server MCP, beserta daftar tool yang tersedia.

Detail selengkapnya ada di [dokumentasi MCP Cursor](https://docs.cursor.com/en/context/mcp#using-mcp-json).

### VS Code

Untuk mengatur MCP di VS Code bersama GitHub Copilot, tambahkan server-nya ke berkas konfigurasi `.vscode/mcp.json` project Anda:

```json:line-numbers [.vscode/mcp.json]
{
  "servers": {
    "kliping": {
      "command": "npx",
      "args": ["kliping@latest", "mcp"]
    }
  }
}
```

Setelah konfigurasinya ditambahkan, buka `.vscode/mcp.json` lalu klik **Start** di samping nama server-nya.

Detail selengkapnya ada di [dokumentasi MCP VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

### Codex

::: tip 
**Catatan:** CLI `kliping` tidak memperbarui `~/.codex/config.toml` secara otomatis. Konfigurasinya perlu Anda tambahkan sendiri.
:::

Untuk mengatur MCP di Codex, tambahkan server-nya ke `~/.codex/config.toml`:

```toml:line-numbers [~/.codex/config.toml]
[mcp_servers.kliping]
command = "npx"
args = ["kliping@latest", "mcp"]
```

Setelah konfigurasinya ditambahkan, mulai ulang Codex supaya server MCP-nya termuat.

### Opencode

Untuk mengatur MCP di opencode, tambahkan server-nya ke `opencode.json`:

```json:line-numbers [opencode.json]
{
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
        "kliping": {
            "type": "local",
            "enabled": true,
            "command": ["npx", "kliping@latest", "mcp"]
        }
    }
}
```
Detail selengkapnya ada di [dokumentasi Opencode](https://opencode.ai/docs/mcp-servers/).

---

## Mengatur Registry

Server MCP mendukung banyak registry sekaligus lewat konfigurasi `components.json` di project Anda. Dengan begitu Anda bisa mengambil komponen dari berbagai sumber, termasuk registry privat dan penyedia pihak ketiga.

Daftarkan registry tambahan di `components.json` Anda:

```json:line-numbers [components.json]
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

::: tip 
**Catatan:** untuk mengakses registry `@kliping`, tidak perlu konfigurasi apa pun.
:::

---

## Autentikasi

Untuk registry privat yang butuh autentikasi, isi variabel lingkungannya di `.env.local`:

```bash [.env.local]
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

Keterangan lengkap soal autentikasi registry ada di dokumentasi Autentikasi.

---

## Contoh Perintah

Setelah server MCP-nya diatur, Anda bisa berinteraksi dengan registry memakai bahasa sehari-hari. Coba salah satu perintah berikut:

### Menelusuri & Mencari

- Tunjukkan semua komponen yang tersedia di registry Kliping
- Carikan form login dari registry Kliping

### Menyusun Halaman

- Buatkan halaman dashboard dengan sidebar, kartu statistik, dan grafik dari Kliping
- Susun landing page: navbar, hero, fitur, harga, FAQ, footer — pakai block Kliping
- Tambahkan halaman login dan register memakai block authentication Kliping

### Memasang Item

- Tambahkan komponen button ke project saya
- Buatkan form login memakai komponen Kliping
- Pasang aturan Cursor dari registry acme

### Bekerja dengan Namespace

- Tunjukkan komponen dari registry acme
- Pasang @internal/auth-form
- Bangunkan halaman landing memakai section hero, features, dan testimonials dari registry acme

---

## Mengatasi Masalah

### MCP Tidak Merespons

Kalau server MCP tidak merespons perintah Anda:

1. **Periksa konfigurasi** — pastikan server MCP sudah diatur dengan benar dan aktif di klien MCP Anda.
2. **Mulai ulang klien MCP** — setiap kali konfigurasinya berubah, mulai ulang kliennya.
3. **Pastikan sudah terpasang** — `mcp init` memasang paket `kliping` sebagai devDependency; cek bahwa paket itu benar-benar ada di project Anda.
4. **Periksa jaringan** — pastikan registry yang diatur memang bisa Anda akses.

### Masalah Akses Registry

Kalau komponen tidak termuat dari registry:

1. **Periksa components.json** — pastikan URL registry-nya sudah benar.
2. **Uji autentikasi** — pastikan variabel lingkungan untuk registry privat sudah terisi.
3. **Cek registry-nya** — pastikan registry itu memang online dan bisa dijangkau.
4. **Periksa namespace** — pastikan sintaksnya benar (`@namespace/komponen`).

### Pemasangan Gagal

Kalau komponen gagal dipasang:

1. **Periksa penyiapan project** — pastikan berkas `components.json` Anda sah.
2. **Cek path-nya** — pastikan folder tujuannya memang ada.
3. **Periksa izin akses** — pastikan folder komponennya bisa ditulisi.
4. **Tinjau dependency** — pastikan semua dependency yang dibutuhkan sudah terpasang.

### Tool atau Prompt Tidak Muncul

Kalau muncul pesan `No tools or prompts`, coba langkah berikut:

1. **Bersihkan cache npx** — jalankan `npx clear-npx-cache`.
2. **Aktifkan ulang server MCP** — coba nonaktifkan lalu aktifkan lagi di klien MCP Anda.
3. **Periksa log** — di Cursor, log-nya bisa dilihat lewat View → Output, lalu pilih `MCP: project-*` di dropdown-nya.

---

## Bacaan Lanjutan

- [Dokumentasi Registry](/registry/) — panduan lengkap soal registry
- [CLI](/cli#mcp) — perintah `mcp` dan `mcp init`
- [Autentikasi](/registry/getting-started#menambahkan-autentikasi) — mengamankan registry privat Anda
- [Spesifikasi MCP](https://modelcontextprotocol.io) — mengenal Model Context Protocol
