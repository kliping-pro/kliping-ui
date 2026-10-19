---
title: registry.json
description: Skema untuk menjalankan registry komponen Anda sendiri.
---

Skema `registry.json` dipakai untuk mendefinisikan registry komponen buatan Anda.

```json:line-numbers [registry.json]
{
  "$schema": "https://kliping.pro/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## Definisi

JSON Schema untuk `registry.json` bisa Anda lihat [di sini](https://kliping.pro/schema/registry.json).

### $schema

Properti `$schema` menentukan skema untuk berkas `registry.json`.

```json:line-numbers [registry.json]
{
  "$schema": "https://kliping.pro/schema/registry.json"
}
```

### name

Properti `name` menentukan nama registry Anda. Nilainya dipakai untuk atribut data dan metadata lainnya.

```json:line-numbers [registry.json]
{
  "name": "acme"
}
```

### homepage

Halaman utama registry Anda. Nilainya dipakai untuk atribut data dan metadata lainnya.

```json:line-numbers [registry.json]
{
  "homepage": "https://acme.com"
}
```

### items

Daftar `items` di registry Anda. Tiap item harus mengikuti [spesifikasi skema registry-item](https://kliping.pro/schema/registry-item.json).

```json:line-numbers [registry.json]
{
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Keterangan lengkapnya ada di [dokumentasi skema registry-item](/registry/registry-item-json).
