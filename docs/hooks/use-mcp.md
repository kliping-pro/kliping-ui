---
title: useMcp
description: "Belum ada padanan Vue-nya. Ini satu-satunya halaman yang masih kosong, dan sengaja."
---

Menyambung ke server [Model Context Protocol](https://modelcontextprotocol.io)
dari sisi klien: membuka transport, menjaga siklus hidup sesi, menyediakan daftar
tool secara reaktif, dan memulihkan sambungan yang putus di tengah jalan.

**Belum ada paket Vue yang melakukan itu**, dan registry ini juga belum
mengirimnya.

## Kenapa belum

Bahan mentahnya ada dan netral: SDK resminya,
[`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk),
tidak terikat framework mana pun. Yang belum ada adalah lapisan reaktif di
atasnya — dan lapisan itu bukan pekerjaan kecil. Sesi MCP punya keadaan yang
harus dijaga hidup lintas komponen, sambungan yang bisa putus kapan saja, dan
daftar tool yang berubah saat servernya mengabarkannya.

Itu composable yang berdiri sendiri, bukan pembungkus tipis. Menulisnya
setengah jadi lebih buruk daripada tidak menulisnya sama sekali.

## Statusnya

**Tertunda, dan sengaja.** Ini satu-satunya dari 55 halaman yang belum punya
padanan Vue sama sekali. Ditaruh paling akhir karena dua alasan: pekerjaannya
paling besar, dan peminatnya paling sedikit.

Kalau Anda memang membutuhkannya,
[bukalah issue](https://github.com/kliping-pro/kliping-ui/issues) — urutannya
bisa berubah kalau ada yang benar-benar memakainya.
