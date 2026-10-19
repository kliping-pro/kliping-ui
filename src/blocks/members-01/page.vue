<script lang="ts">
export const description = "Tabel anggota dengan ikon peran di tiap baris."
</script>

<script setup lang="ts">
import { Dot, Eye, Pencil, ShieldCheck, UserPlus } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const roleIcons = {
  Admin: ShieldCheck,
  Editor: Pencil,
  Viewer: Eye,
}

const members = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Admin",
    joined: "2021-01-01",
  },
  {
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    role: "Editor",
    joined: "2021-01-02",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    role: "Viewer",
    joined: "2021-01-03",
  },
  {
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Viewer",
    joined: "2021-01-04",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "Viewer",
    joined: "2021-01-05",
  },
]
</script>

<template>
  <div class="px-6 py-12">
    <div class="mx-auto max-w-3xl border">
      <!-- Tombol undang turun ke bawah judul di layar terkecil. -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b bg-muted/70 px-6 py-5">
        <div>
          <h2 class="font-medium text-lg">Members</h2>
          <div class="mt-0.5 flex items-center text-muted-foreground text-sm">
            <span>Team Avengers</span> <Dot /> <span>10 Members</span>
          </div>
        </div>
        <Button>
          <UserPlus /> Invite Members
        </Button>
      </div>

      <div class="h-3 bg-[image:repeating-linear-gradient(315deg,_var(--muted)_0,_var(--muted)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />

      <Table class="border-t px-6">
        <TableHeader>
          <TableRow class="*:py-3 *:first:ps-6 *:last:pe-6">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="member in members"
                class="*:py-3 *:first:ps-6 *:last:pe-6"
                :key="member.name"
              >
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Avatar class="size-7">
                      <AvatarFallback>{{ member.name.charAt(0) }}</AvatarFallback>
                    </Avatar>
                    <span class="ml-2">{{ member.name }}</span>
                  </div>
                </TableCell>
                <TableCell>{{ member.email }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <component :is="roleIcons[member.role as keyof typeof roleIcons]" class="size-4.5" />
                    <span>{{ member.role }}</span>
                  </div>
                </TableCell>
                <TableCell>{{ member.joined }}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
