<script lang="ts">
export const description = "Halaman pendaftaran dua kolom dengan gambar di sebelah kanan."
</script>

<script setup lang="ts">
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Logo from '@/blocks/signup-08/components/Logo.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'
import GoogleLogo from '@/blocks/signup-08/components/GoogleLogo.vue'

const schema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
}))

const initialValues = {
  email: "",
  password: "",
}

function onSubmit(values: unknown) {
  // Block ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :initial-values="initialValues" keep-values :validation-schema="schema">
    <div class="flex h-screen items-center justify-center">
      <div class="flex h-full w-full">
        <div class="relative m-auto flex w-full max-w-sm flex-col items-center p-8 outline-0 outline-border/40 outline-offset-0.5 sm:outline-2 dark:outline-border/80">
          <div class="absolute inset-x-0 top-0 w-[calc(100%+4rem)] -translate-x-8 border-t max-sm:hidden" />
          <div class="absolute inset-x-0 bottom-0 w-[calc(100%+4rem)] -translate-x-8 border-b max-sm:hidden" />
          <div class="absolute inset-y-0 left-0 h-[calc(100%+4rem)] -translate-y-8 border-s max-sm:hidden" />
          <div class="absolute inset-y-0 right-0 h-[calc(100%+4rem)] -translate-y-8 border-e max-sm:hidden" />

          <div class="absolute inset-x-0 -top-1 w-[calc(100%+3rem)] -translate-x-6 border-t max-sm:hidden" />
          <div class="absolute inset-x-0 -bottom-1 w-[calc(100%+3rem)] -translate-x-6 border-b max-sm:hidden" />
          <div class="absolute inset-y-0 -left-1 h-[calc(100%+3rem)] -translate-y-6 border-s max-sm:hidden" />
          <div class="absolute inset-y-0 -right-1 h-[calc(100%+3rem)] -translate-y-6 border-e max-sm:hidden" />

          <Logo class="h-9 w-9" />
          <p class="mt-4 font-medium text-xl">
            Sign up for Acme UI
          </p>

          <Button class="mt-8 w-full gap-3">
            <GoogleLogo />
            Continue with Google
          </Button>

          <div class="my-7 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span class="px-2 text-sm">OR</span>
            <Separator />
          </div>
          <form
            class="w-full space-y-4"
            @submit="handleSubmit($event, onSubmit)"
          >
            <VeeField v-slot="{ componentField, errors }" name="email">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Email</FieldLabel>
                <Input
                  :aria-invalid="!!errors.length"
                  class="w-full"
                  placeholder="Email"
                  type="email"
                  v-bind="componentField"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ componentField, errors }" name="password">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Password</FieldLabel>
                <Input
                  :aria-invalid="!!errors.length"
                  class="w-full"
                  placeholder="Password"
                  type="password"
                  v-bind="componentField"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <Button class="mt-4 w-full" type="submit">
              Continue with Email
            </Button>
          </form>

          <p class="mt-5 text-center text-sm">
            Already have an account?
            <a class="ml-1 text-muted-foreground underline" href="#">
              Log in
            </a>
          </p>
        </div>
        <div class="relative hidden w-full max-w-2xl grow border-l bg-muted lg:block">
          <img
            alt="Sign up"
            class="absolute inset-0 size-full object-cover"
            src="/images/ascii-art.png"
          />
        </div>
      </div>
    </div>
  </Form>
</template>
