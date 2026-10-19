---
title: Examples
description: "Contoh item registry: style, komponen, CSS variable, dan lainnya."
---

## registry:style

### Style kustom yang memperluas dasar Kliping

Item registry berikut adalah style kustom yang memperluas dasar Kliping (helper `cn()` dan dependensinya). Saat `npx kliping@latest init https://example.com/r/example-style.json` dijalankan, ia akan:

- Memasang `@iconify/vue` sebagai dependency.
- Menambahkan block `login-01` dan komponen `calendar` dari registry Kliping ke project.
- Menambahkan `editor` dari registry jarak jauh.
- Mengisi variabel `font-sans` dengan `Inter, sans-serif`.
- Memasang warna `brand` untuk mode terang dan gelap.

```json:line-numbers [example-style.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["@iconify/vue"],
  "registryDependencies": [
    "login-01",
    "calendar",
    "https://example.com/r/editor.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### Style kustom dari nol

Item registry berikut adalah style kustom yang tidak memperluas dasar Kliping — perhatikan field `extends: none`.

Ia bisa dipakai membangun style baru dari nol: komponen sendiri, CSS variable sendiri, dependency sendiri, dan seterusnya.

Saat `npx kliping@latest init https://example.com/r/new-style.json` dijalankan, ia akan:

- Memasang `tailwind-merge` dan `clsx` sebagai dependency.
- Menambahkan komponen `button`, `input`, `label`, dan `select` dari registry jarak jauh.
- Memasang CSS variable baru: `main`, `bg`, `border`, `text`, `ring`.

Karena dasar Kliping dilewati, helper `cn()` di `lib/utils` juga perlu disediakan registry Anda sendiri — di contoh ini lewat `https://example.com/r/utils.json`.

```json:line-numbers [example-style.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "https://example.com/r/utils.json",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000"
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff"
    }
  }
}
```

## registry:theme

### Tema kustom

```json:line-numbers [example-theme.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "light": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.546 0.245 262.881)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.746 0.16 232.661)",
      "sidebar-primary": "oklch(0.546 0.245 262.881)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.746 0.16 232.661)"
    },
    "dark": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.707 0.165 254.624)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.707 0.165 254.624)",
      "sidebar-primary": "oklch(0.707 0.165 254.624)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.707 0.165 254.624)"
    }
  }
}
```

### Warna kustom

Style berikut melakukan inisialisasi dengan dasar Kliping, lalu menambahkan warna `brand` kustom.

```json:line-numbers [example-style.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "cssVars": {
    "light": {
      "brand": "oklch(0.99 0.00 0)"
    },
    "dark": {
      "brand": "oklch(0.14 0.00 286)"
    }
  }
}
```

## registry:block

### Block kustom

Contoh ini mendefinisikan block login sederhana yang memakai komponen `button`, `card`, `input`, dan `label` dari registry Kliping.

```json:line-numbers [Login01.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "Login01",
  "type": "registry:block",
  "description": "A simple login form.",
  "registryDependencies": ["button", "card", "input", "label"],
  "files": [
    {
      "path": "blocks/Login01/page.vue",
      "content": "import { LoginForm } ...",
      "type": "registry:page",
      "target": "pages/login/index.vue"
    },
    {
      "path": "blocks/login-01/components/LoginForm.vue",
      "content": "...",
      "type": "registry:component"
    }
  ]
}
```

### Memasang block sambil mengganti primitifnya

Anda bisa memasang block dari registry Kliping lalu mengganti komponen primitifnya dengan buatan Anda sendiri.

Saat `npx kliping@latest add https://example.com/r/custom-login.json` dijalankan, ia akan:

- Menambahkan block `login-01` dari registry Kliping.
- Mengganti primitif `button`, `input`, dan `label` dengan versi dari registry jarak jauh.

```json:line-numbers [example-style.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-login",
  "type": "registry:block",
  "registryDependencies": [
    "login-01",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json"
  ]
}
```

## CSS Variables

### Variabel Tema Kustom

Tambahkan variabel tema kustom ke objek `theme`.

```json:line-numbers [example-theme.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "font-heading": "Inter, sans-serif",
      "shadow-card": "0 0 0 1px rgba(0, 0, 0, 0.1)"
    }
  }
}
```

### Menimpa CSS variable Tailwind

```json:line-numbers [example-theme.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "spacing": "0.2rem",
      "breakpoint-sm": "640px",
      "breakpoint-md": "768px",
      "breakpoint-lg": "1024px",
      "breakpoint-xl": "1280px",
      "breakpoint-2xl": "1536px"
    }
  }
}
```

## Menambahkan CSS Kustom

### Style dasar

```json:line-numbers [example-base.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "css": {
    "@layer base": {
      "h1": {
        "font-size": "var(--text-2xl)"
      },
      "h2": {
        "font-size": "var(--text-xl)"
      }
    }
  }
}
```

### Components

```json:line-numbers [example-card.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-card",
  "type": "registry:component",
  "css": {
    "@layer components": {
      "card": {
        "background-color": "var(--color-white)",
        "border-radius": "var(--rounded-lg)",
        "padding": "var(--spacing-6)",
        "box-shadow": "var(--shadow-xl)"
      }
    }
  }
}
```

## Menambahkan Utility Kustom

### Utility sederhana

```json:line-numbers [example-component.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility content-auto": {
      "content-visibility": "auto"
    }
  }
}
```

### Utility yang lebih rumit

```json:line-numbers [example-utility.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility scrollbar-hidden": {
      "scrollbar-hidden": {
        "&::-webkit-scrollbar": {
          "display": "none"
        }
      }
    }
  }
}
```

### Utility fungsional

```json:line-numbers [example-functional.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility tab-*": {
      "tab-size": "var(--tab-size-*)"
    }
  }
}
```

## Menambahkan Animasi Kustom

Catatan: untuk memakai animasi, Anda perlu mendefinisikan `@keyframes` di CSS sekaligus `theme` di dalam cssVars.

```json:line-numbers [example-component.json]
{
  "$schema": "https://kliping.pro/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "cssVars": {
    "theme": {
      "--animate-wiggle": "wiggle 1s ease-in-out infinite"
    }
  },
  "css": {
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```
