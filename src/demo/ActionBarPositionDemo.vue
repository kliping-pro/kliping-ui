<!-- example: 1. Position -->
<script setup lang="ts">
import { Archive, Star } from '@lucide/vue'
import { ref } from 'vue'
import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from '@/components/action-bar'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const open = ref(false)
const side = ref<'top' | 'bottom'>('bottom')
const align = ref<'start' | 'center' | 'end'>('center')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <Switch id="action-bar-open" v-model="open" />
      <Label for="action-bar-open">Show Action Bar</Label>
    </div>
    <div class="flex items-center gap-2">
      <Label for="action-bar-side" class="w-14">
        Side
      </Label>
      <Select v-model="side">
        <SelectTrigger id="action-bar-side" class="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="top">
            Top
          </SelectItem>
          <SelectItem value="bottom">
            Bottom
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="flex items-center gap-2">
      <Label for="action-bar-align" class="w-14">
        Align
      </Label>
      <Select v-model="align">
        <SelectTrigger id="action-bar-align" class="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="start">
            Start
          </SelectItem>
          <SelectItem value="center">
            Center
          </SelectItem>
          <SelectItem value="end">
            End
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <ActionBar v-model:open="open" :side="side" :align="align">
      <ActionBarSelection>
        3 selected
      </ActionBarSelection>
      <ActionBarSeparator />
      <ActionBarGroup>
        <ActionBarItem>
          <Star /> Favorite
        </ActionBarItem>
        <ActionBarItem>
          <Archive /> Archive
        </ActionBarItem>
      </ActionBarGroup>
      <ActionBarSeparator />
      <ActionBarClose />
    </ActionBar>
  </div>
</template>
