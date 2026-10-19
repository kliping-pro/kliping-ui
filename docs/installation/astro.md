---
title: Astro
description: Memasang dan mengonfigurasi Kliping di project Astro.
---

<Steps>

### Buat project

Mulai dengan membuat project Astro baru memakai tool milik Astro sendiri. Template
`with-tailwindcss` sudah berisi Tailwind CSS v4, dan `--add vue` memasang integrasi Vue:

```bash
npx create-astro@latest astro-app  --template with-tailwindcss --install --add vue --git
```

::: tip `init` belum menyiapkan Astro otomatis
Untuk Vite dan Nuxt, `kliping init` memasang Tailwind CSS dan alias `@` sendiri. Untuk Astro
  belum: Tailwind CSS v4 dan alias `@` harus sudah ada sebelum `init` dijalankan. Template di
  atas sudah membawa Tailwind; alias-nya Anda tambahkan di langkah berikut. Kalau project Astro
  Anda dibuat dengan cara lain, ikuti [Manual Installation](/installation/manual).
:::

### Sunting file tsconfig.json

Tambahkan kode berikut ke `tsconfig.json` supaya path bisa diselesaikan dengan benar:

```json:line-numbers{4-9} [tsconfig.json]
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Jalankan CLI

Jalankan perintah `init` untuk memasang dasar Kliping (helper `cn()` beserta dependensinya
dan token tema) dan menulis `components.json`:

```bash
npx kliping@latest init
```

### Tambahkan komponen

Sekarang Anda bisa mulai menambahkan komponen ke project.

```bash
npx kliping@latest add button
```

Perintah di atas menambahkan komponen `Button` ke project Anda. Setelah itu, import seperti ini:

```astro:line-numbers{2,10} [src/pages/index.astro]
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
	<head>
		<title>Astro</title>
	</head>
	<body>
		<Button>Hello World</Button>
	</body>
</html>
```

</Steps>
