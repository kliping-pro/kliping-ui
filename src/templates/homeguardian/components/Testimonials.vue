<script setup lang="ts">
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-15.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-16.svg",
    testimonial:
      "We integrated this solution into our stack within days, and the benefits were immediate. Our team collaboration improved, deployment times dropped, and the analytics insights have helped us fine-tune performance at every level.",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-17.svg",
    testimonial:
      "I've worked with multiple marketing platforms over the years, but none have offered the kind of personalized experience and seamless integration that this one does. It has truly elevated our campaigns and improved our ROI.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-18.svg",
    testimonial: "Clean, fast, and reliable. Everything a dev could ask for.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-19.svg",
    testimonial: "Smooth and delightful experience!",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-20.svg",
    testimonial:
      "I've used dozens of tools in the past year alone, and this is one of the few I'd actually recommend to other founders. It doesn't just work — it works smart. Everything feels thoughtfully designed and built with care.",
  },
]

// Dua kartu per kolom, urutannya sama dengan yang dulu dihasilkan `columns-3`.
const columns = [0, 2, 4].map(start => testimonials.slice(start, start + 2))
</script>

<!--
  Dua penyimpangan dari sumbernya, dan sengaja.

  `id="testimonials"`: menu navigasi template ini menautkan `#testimonials`,
  tapi tidak ada satu elemen pun di halamannya yang memakai id itu — jadi menu
  tersebut menggulir ke tempat yang tidak ada. Empat bagian lain punya idnya
  masing-masing; yang satu ini terlewat di hulu.

  Susunan kartunya: sumbernya memakai CSS `columns`, dan kolom seperti itu
  tidak bisa meregangkan isinya, jadi dasar kartu terakhir tiap kolom berhenti
  di ketinggian yang berbeda-beda. Di sini tiap kolom berupa flex tegak di
  dalam grid — kolomnya sama tinggi, dan kartu terakhirnya tumbuh mengisi sisa.
  Di dua kolom (sm–lg) kolom ketiga berbaring di bawah sebagai satu baris dua
  kartu yang sama tinggi; di satu kolom semuanya bertumpuk sesuai urutan.
-->
<template>
  <div id="testimonials" class="mx-auto max-w-(--breakpoint-xl) px-6 py-12 sm:py-24">
    <h2 class="text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
      Loved by Our Users
    </h2>
    <p class="text-muted-foreground mt-2 text-center text-lg tracking-normal text-balance sm:mt-4 sm:text-2xl">
      Their experiences speak louder than words
    </p>

    <div class="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :class="[
          'flex flex-col gap-6',
          columnIndex === columns.length - 1 && 'sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:flex',
        ]"
      >
        <div v-for="({ name, avatar, role, testimonial }, index) in column"
          :key="index"
          class="bg-muted flex flex-col rounded-lg border p-1.5 last:grow"
        >
          <div class="from-muted/50 to-background via-background dark:bg-background dark:border-muted-foreground/30 relative flex grow flex-col rounded-md border bg-gradient-to-bl px-5 pt-10 pb-3">
            <!-- Quote -->
            <span class="text-muted-foreground absolute top-5 left-3 font-mono text-7xl">
              &#8220;
            </span>

            <p class="grow py-6 text-lg font-medium">{{ testimonial }}</p>
            <div class="mt-2 flex items-center gap-3 py-3.5 sm:mt-4">
              <img
                :src="avatar"
                alt=""
                class="ring-border ring-offset-background h-12 w-12 rounded-full ring-2 ring-offset-[2px]"
              />
              <div class="flex flex-col">
                <p class="font-semibold">{{ name }}</p>
                <p class="text-sm">{{ role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
