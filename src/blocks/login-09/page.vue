<script lang="ts">
export const description = "Halaman masuk dengan gambar penuh di belakang formnya."
</script>

<script setup lang="ts">
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Logo from '@/blocks/login-09/components/Logo.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'
import GoogleLogo from '@/blocks/login-09/components/GoogleLogo.vue'

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
      <div class="flex h-full w-full p-4">
        <div class="m-auto flex w-full max-w-xs flex-col items-center">
          <Logo class="h-9 w-9" />
          <p class="mt-4 font-medium text-xl">Log in to Acme UI</p>

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

          <div class="mt-5 space-y-5">
            <a
              class="block text-center text-muted-foreground text-sm underline"
              href="#"
            >
              Forgot your password?
            </a>
            <p class="text-center text-sm">
              Don't have an account?
              <a class="ml-1 text-muted-foreground underline" href="#">
                Create account
              </a>
            </p>
          </div>
        </div>
        <div class="relative hidden max-w-xl grow lg:block">
          <img
            alt="Login"
            class="absolute inset-0 size-full rounded-xl object-cover"
            src="/images/ascii-art.png"
          />
        </div>
      </div>
    </div>
  </Form>
</template>
