<script lang="ts">
export const description = "Dialog undang anggota dengan isian surel dan pilihan peran."
</script>

<script setup lang="ts">
import { UserPlus } from '@lucide/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Satu-satunya block di keluarga ini yang punya validasi sungguhan. Sumbernya
// memakai react-hook-form dengan pola render prop — `<Controller render={...}>`
// yang mengembalikan JSX dari sebuah fungsi. Vue tidak punya padanan langsung
// untuk itu, dan tidak membutuhkannya: `<Field v-slot>` menyerahkan hal yang
// sama lewat slot dengan cakupan, dan hasilnya tetap template biasa yang bisa
// dibaca dari atas ke bawah.
const schema = toTypedSchema(z.object({
  email: z.string().email(),
  role: z.enum(['viewer', 'editor', 'admin']),
}))

const initialValues = { email: '', role: 'viewer' }

function onSubmit(values: unknown) {
  // Block ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form
    v-slot="{ handleSubmit }"
    as=""
    :initial-values="initialValues"
    keep-values
    :validation-schema="schema"
  >
    <Dialog open>
      <DialogContent class="!max-w-sm">
        <DialogHeader>
          <DialogTitle class="font-medium">
            Invite Member
          </DialogTitle>
          <DialogDescription>Invite a member to your team.</DialogDescription>
        </DialogHeader>

        <form id="inviteMemberForm" class="mt-4" @submit="handleSubmit($event, onSubmit)">
          <div class="space-y-4">
            <VeeField v-slot="{ componentField, errors }" name="email">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  :aria-invalid="!!errors.length"
                  placeholder="member@example.com"
                  type="email"
                  v-bind="componentField"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ componentField, errors }" name="role">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="role">
                  Role
                </FieldLabel>
                <Select v-bind="componentField">
                  <SelectTrigger id="role" :aria-invalid="!!errors.length" class="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">
                      Viewer
                    </SelectItem>
                    <SelectItem value="editor">
                      Editor
                    </SelectItem>
                    <SelectItem value="admin">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </div>
        </form>

        <DialogFooter class="mt-10 border-t">
          <Button form="inviteMemberForm" type="submit">
            <UserPlus /> Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
