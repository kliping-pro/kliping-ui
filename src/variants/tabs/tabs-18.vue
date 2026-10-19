<script lang="ts">
export const description = "Isi tabnya muncul satu per satu, bergantian dari atas."
</script>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserList from '@/variants/tabs/components/UserList.vue'

const followers = [
  { username: 'jane_doe', fullName: 'Jane Doe' },
  { username: 'tech_guru', fullName: 'Alex Thompson' },
  { username: 'nature_lover', fullName: 'Emma Green' },
  { username: 'photogirl', fullName: 'Sophia Martinez' },
  { username: 'code_master', fullName: 'Liam Patel' },
]

const following = [
  { username: 'startup_guy', fullName: 'James Lee' },
  { username: 'design_dreamer', fullName: 'Mia Wilson' },
  { username: 'art_addict', fullName: 'Benjamin White' },
  { username: 'web_wizard', fullName: 'Lucas Nguyen' },
  { username: 'health_nut', fullName: 'Ella Singh' },
]
</script>

<template>
  <Tabs class="w-full max-w-xs" default-value="followers">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="followers">Followers</TabsTrigger>
      <TabsTrigger value="following">Following</TabsTrigger>
    </TabsList>

    <div class="mt-2 rounded-md border p-3 sm:p-4">
      <TabsContent value="followers">
        <UserList :users="followers" />
      </TabsContent>
      <TabsContent value="following">
        <UserList :users="following" />
      </TabsContent>
    </div>
  </Tabs>
</template>
