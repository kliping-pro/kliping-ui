<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'

const user = ref({ id: 1, name: 'Ada' })
const byId = ref(0)
const byObject = ref(0)

// Pembanding kustom di Vue = getter yang mengembalikan kuncinya.
watch(() => user.value.id, () => (byId.value += 1))
watch(user, () => (byObject.value += 1))

const names = ['Ada', 'Ben', 'Cleo']

function changeName() {
  user.value = { id: user.value.id, name: names[(names.indexOf(user.value.name) + 1) % names.length]! }
}

function changeId() {
  user.value = { id: user.value.id + 1, name: user.value.name }
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Custom Compare
      </h3>
      <p class="text-muted-foreground text-sm">
        Watch only the key you care about, not the whole object.
      </p>
    </div>

    <div class="rounded-lg border bg-muted/40 px-4 py-3 text-center font-mono text-sm">
      <span class="text-muted-foreground">{ id: </span>{{ user.id }}<span class="text-muted-foreground">, name: </span>"{{ user.name }}"<span class="text-muted-foreground"> }</span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Watching object</span>
        <span class="font-mono font-semibold text-xl tabular-nums">{{ byObject }}<span class="ml-1 font-normal text-muted-foreground text-xs">runs</span></span>
      </div>
      <div class="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
        <span class="text-muted-foreground text-xs">Watching id only</span>
        <span class="font-mono font-semibold text-xl tabular-nums">{{ byId }}<span class="ml-1 font-normal text-muted-foreground text-xs">runs</span></span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="changeName">
        Change name
      </Button>
      <Button @click="changeId">
        Change id
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      A new name makes a new object, but the
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">id</code> watcher stays quiet.
    </p>
  </div>
</template>
