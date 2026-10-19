<script lang="ts">
export const description = "Undangan lewat tautan berbagi, bukan surel."
</script>

<script setup lang="ts">
import { Copy, Search, UserPlusIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const people = [
  {
    username: "shadcn",
    avatar: "/samples/avatars/avatar-22.svg",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "/samples/avatars/avatar-23.svg",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "/samples/avatars/avatar-24.svg",
    email: "evilrabbit@vercel.com",
  },
  {
    username: "vercel",
    avatar: "/samples/avatars/avatar-01.svg",
    email: "vercel@vercel.com",
  },
  {
    username: "rauchg",
    avatar: "/samples/avatars/avatar-02.svg",
    email: "rauchg@vercel.com",
  },
  {
    username: "sindresorhus",
    avatar: "/samples/avatars/avatar-03.svg",
    email: "sindresorhus@vercel.com",
  },
  {
    username: "yyx990803",
    avatar: "/samples/avatars/avatar-04.svg",
    email: "yyx990803@vercel.com",
  },
  {
    username: "gaearon",
    avatar: "/samples/avatars/avatar-05.svg",
    email: "gaearon@vercel.com",
  },
  {
    username: "acdlite",
    avatar: "/samples/avatars/avatar-06.svg",
    email: "acdlite@vercel.com",
  },
  {
    username: "sebmarkbage",
    avatar: "/samples/avatars/avatar-07.svg",
    email: "sebmarkbage@vercel.com",
  },
  {
    username: "timlrx",
    avatar: "/samples/avatars/avatar-08.svg",
    email: "timlrx@vercel.com",
  },
  {
    username: "leerob",
    avatar: "/samples/avatars/avatar-09.svg",
    email: "leerob@vercel.com",
  },
  {
    username: "t3dotgg",
    avatar: "/samples/avatars/avatar-10.svg",
    email: "t3dotgg@vercel.com",
  },
  {
    username: "withastro",
    avatar: "/samples/avatars/avatar-11.svg",
    email: "withastro@vercel.com",
  },
  {
    username: "prisma",
    avatar: "/samples/avatars/avatar-12.svg",
    email: "prisma@vercel.com",
  },
  {
    username: "tailwindlabs",
    avatar: "/samples/avatars/avatar-13.svg",
    email: "tailwindlabs@vercel.com",
  },
  {
    username: "adamwathan",
    avatar: "/samples/avatars/avatar-14.svg",
    email: "adamwathan@vercel.com",
  },
  {
    username: "steveukx",
    avatar: "/samples/avatars/avatar-15.svg",
    email: "steveukx@vercel.com",
  },
  {
    username: "antfu",
    avatar: "/samples/avatars/avatar-16.svg",
    email: "antfu@vercel.com",
  },
  {
    username: "chakra-ui",
    avatar: "/samples/avatars/avatar-17.svg",
    email: "chakra-ui@vercel.com",
  },
  {
    username: "mui",
    avatar: "/samples/avatars/avatar-18.svg",
    email: "mui@vercel.com",
  },
  {
    username: "pmndrs",
    avatar: "/samples/avatars/avatar-19.svg",
    email: "pmndrs@vercel.com",
  },
  {
    username: "egoist",
    avatar: "/samples/avatars/avatar-20.svg",
    email: "egoist@vercel.com",
  },
  {
    username: "mattpocock",
    avatar: "/samples/avatars/avatar-21.svg",
    email: "mattpocock@vercel.com",
  },
  {
    username: "bradtraversy",
    avatar: "/samples/avatars/avatar-22.svg",
    email: "bradtraversy@vercel.com",
  },
  {
    username: "kentcdodds",
    avatar: "/samples/avatars/avatar-23.svg",
    email: "kentcdodds@vercel.com",
  },
  {
    username: "jaredpalmer",
    avatar: "/samples/avatars/avatar-24.svg",
    email: "jaredpalmer@vercel.com",
  },
  {
    username: "bholmesdev",
    avatar: "/samples/avatars/avatar-01.svg",
    email: "bholmesdev@vercel.com",
  },
  {
    username: "joshwcomeau",
    avatar: "/samples/avatars/avatar-02.svg",
    email: "joshwcomeau@vercel.com",
  },
  {
    username: "uidotdev",
    avatar: "/samples/avatars/avatar-03.svg",
    email: "uidotdev@vercel.com",
  },
  {
    username: "theprimeagen",
    avatar: "/samples/avatars/avatar-04.svg",
    email: "theprimeagen@vercel.com",
  },
  {
    username: "fireship-io",
    avatar: "/samples/avatars/avatar-05.svg",
    email: "fireship@vercel.com",
  },
  {
    username: "clerkinc",
    avatar: "/samples/avatars/avatar-06.svg",
    email: "clerkinc@vercel.com",
  },
  {
    username: "supabase",
    avatar: "/samples/avatars/avatar-07.svg",
    email: "supabase@vercel.com",
  },
  {
    username: "planetscale",
    avatar: "/samples/avatars/avatar-08.svg",
    email: "planetscale@vercel.com",
  },
  {
    username: "nextauthjs",
    avatar: "/samples/avatars/avatar-09.svg",
    email: "nextauthjs@vercel.com",
  },
  {
    username: "openai",
    avatar: "/samples/avatars/avatar-10.svg",
    email: "openai@vercel.com",
  },
  {
    username: "nestjs",
    avatar: "/samples/avatars/avatar-11.svg",
    email: "nestjs@vercel.com",
  },
  {
    username: "reduxjs",
    avatar: "/samples/avatars/avatar-12.svg",
    email: "reduxjs@vercel.com",
  },
  {
    username: "remix-run",
    avatar: "/samples/avatars/avatar-13.svg",
    email: "remix@vercel.com",
  },
  {
    username: "denoland",
    avatar: "/samples/avatars/avatar-14.svg",
    email: "denoland@vercel.com",
  },
  {
    username: "unocss",
    avatar: "/samples/avatars/avatar-15.svg",
    email: "unocss@vercel.com",
  },
  {
    username: "vitejs",
    avatar: "/samples/avatars/avatar-16.svg",
    email: "vitejs@vercel.com",
  },
  {
    username: "graphql",
    avatar: "/samples/avatars/avatar-17.svg",
    email: "graphql@vercel.com",
  },
  {
    username: "chakra-ui-typography",
    avatar: "/samples/avatars/avatar-18.svg",
    email: "chakra-typography@vercel.com",
  },
  {
    username: "radix-ui",
    avatar: "/samples/avatars/avatar-19.svg",
    email: "radix-ui@vercel.com",
  },
  {
    username: "vercel-labs",
    avatar: "/samples/avatars/avatar-20.svg",
    email: "vercel-labs@vercel.com",
  },
  {
    username: "motion-canvas",
    avatar: "/samples/avatars/avatar-21.svg",
    email: "motion-canvas@vercel.com",
  },
  {
    username: "lucide-icons",
    avatar: "/samples/avatars/avatar-22.svg",
    email: "lucide@vercel.com",
  },
  {
    username: "calcom",
    avatar: "/samples/avatars/avatar-23.svg",
    email: "calcom@vercel.com",
  },
]
</script>

<template>
  <Dialog open>
    <DialogContent class="max-w-sm! pb-1.5">
      <DialogHeader>
        <DialogTitle class="font-medium">Invite Members</DialogTitle>
        <DialogDescription>Invite members to your team.</DialogDescription>
      </DialogHeader>

      <div>
        <InputGroup>
          <InputGroupInput placeholder="Search for a member..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <ScrollArea class="mt-2 h-72">
          <Item v-for="person in people" class="px-0" :key="person.username">
            <ItemMedia class="my-auto">
              <Avatar class="size-9">
                <AvatarImage class="grayscale" :src="person.avatar" />
                <AvatarFallback>{{ person.username.charAt(0) }}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent class="gap-0">
              <ItemTitle>{{ person.username }}</ItemTitle>
              <ItemDescription>{{ person.email }}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Tooltip :delay-duration="500">
                <TooltipTrigger as-child>
                  <Button
                    :aria-label="`Send invite to ${person.username}`"
                    class="rounded-full"
                    size="icon"
                    variant="secondary"
                  >
                    <UserPlusIcon />

                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send invite</TooltipContent>
              </Tooltip>
            </ItemActions>
          </Item>
        </ScrollArea>
      </div>

      <div class="-mx-4.5 rounded-md bg-muted px-5 py-4">
        <p class="font-medium text-sm">Copy link and share with others</p>
        <InputGroup class="mt-2 bg-background">
          <InputGroupInput
            placeholder="https://example.com/invite"
            readOnly
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Copy" size="icon-xs" title="Copy">
              <Copy />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </DialogContent>
  </Dialog>
</template>
