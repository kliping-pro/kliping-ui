<script lang="ts">
export const description = "Menu ruang kerja: profil, kotak centang, submenu, dan tombol keluar."
</script>

<script setup lang="ts">
import {
  Bolt,
  ExternalLink,
  Filter,
  LogIn,
  LogOut,
  Rocket,
  Settings2,
  User,
} from '@lucide/vue'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/samples/avatars/avatar-13.svg" />
      </Avatar>
      <div class="flex flex-col text-start">
        <p class="font-medium text-sm">My Workspace</p>
        <p class="text-muted-foreground text-xs">myworkspace.slack.com</p>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="mt-2 w-72">
      <DropdownMenuItem class="py-3">
        <Avatar>
          <AvatarImage src="/samples/avatars/avatar-13.svg" />
        </Avatar>
        <div class="ml-1 flex flex-col">
          <p class="font-medium text-sm">My Workspace</p>
          <p class="text-muted-foreground text-xs">
            myworkspace.slack.com
          </p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="flex-col items-start">
        <div class="flex items-center gap-1">
          <Rocket class="mr-1 h-[18px] w-[18px]" />
          <span class="font-medium leading-none">Upgrade</span>
        </div>
        <p class="text-muted-foreground">
          You're on a free version of Slack.
        </p>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User class="mr-1" /> Invite people
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Settings2 class="mr-1" /> Preferences
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Filter class="mr-1" />
          Filter sidebar
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Activity</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem checked>
                All activity
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Unread messaged only
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Mentions only
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Customize by section
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>People</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem checked>
                Everyone
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Without external people
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Including external people
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Bolt class="mr-1" />
          Tools & settings
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent class="w-52">
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuItem>Customize workspace</DropdownMenuItem>
          <DropdownMenuItem>Workspace builder</DropdownMenuItem>
          <DropdownMenuItem>
            Workspace analytics <ExternalLink class="ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Administration</DropdownMenuLabel>
          <DropdownMenuItem>Manage apps</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogIn class="mr-1" /> Sign in on mobile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LogOut class="mr-1" /> Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
