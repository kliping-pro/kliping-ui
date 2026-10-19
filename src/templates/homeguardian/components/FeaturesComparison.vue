<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ValueCell from '@/templates/homeguardian/components/ValueCell.vue'

interface Feature {
  title: string;
  value: {
    homeGuardian: boolean | string;
    basicSystem: boolean | string;
    otherSystem: boolean | string;
  };
}

const features: Feature[] = [
  {
    title: "Grade Protection	",
    value: {
      homeGuardian: true,
      basicSystem: true,
      otherSystem: false,
    },
  },
  {
    title: "Rapid SOS",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: false,
    },
  },
  {
    title: "Low Upfront Cost",
    value: {
      homeGuardian: true,
      basicSystem: true,
      otherSystem: false,
    },
  },
  {
    title: "Low Monthly Cost",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: true,
    },
  },
  {
    title: "No Contracts",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: true,
    },
  },
  {
    title: "Easy and Fair Cancellation",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: true,
    },
  },
  {
    title: "Lifetime Equipment Warranty",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: false,
    },
  },
  {
    title: "Lifetime Rate Lock Guarantee",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: false,
    },
  },
  {
    title: "Free Upgrades",
    value: {
      homeGuardian: true,
      basicSystem: false,
      otherSystem: false,
    },
  },
  {
    title: "Average Install Time",
    value: {
      homeGuardian: "30 minutes",
      basicSystem: "~ 2 hours",
      otherSystem: "~ 3 hours",
    },
  },
]
</script>

<template>
  <div
    id="features"
    class="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24"
  >
    <strong class="font-semibold text-muted-foreground">
      Our Features
    </strong>
    <h2 class="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tighter text-balance">
      Experience the Difference with HomeGuardian
    </h2>
    <p class="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
      We excel in delivering innovative and high-quality solutions that meet
      the unique needs of our clients.
    </p>

    <div class="mt-16 border p-2 bg-muted border-dashed rounded-lg">
      <Table class="bg-background rounded-md overflow-hidden">
        <TableHeader>
          <TableRow class="[&>th]:py-5 [&>th]:border [&>th]:border-dashed border-dashed text-xl [&>th]:text-center [&>th]:bg-muted/30">
            <TableHead class="w-32 bg-[image:repeating-linear-gradient(315deg,_var(--muted)_0,_var(--muted)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></TableHead>
            <TableHead>HomeGuardian</TableHead>
            <TableHead>Basic System</TableHead>
            <TableHead>Other System</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="feature in features"
            :key="feature.title"
            class="[&>td]:py-5 [&>td]:border [&>td]:border-dashed text-lg border-dashed"
          >
            <TableCell class="text-start px-10 font-medium bg-muted/30">
              {{ feature.title }}
            </TableCell>
            <ValueCell :value="feature.value.homeGuardian" />
            <ValueCell :value="feature.value.basicSystem" />
            <ValueCell :value="feature.value.otherSystem" />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
