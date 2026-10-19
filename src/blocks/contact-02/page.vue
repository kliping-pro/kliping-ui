<script lang="ts">
export const description = "Formulir kontak berdampingan dengan keterangan alamat."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <div class="py-20">
    <div class="mx-auto w-full max-w-(--breakpoint-xl) px-6 xl:px-0">
      <b class="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        Contact Us
      </b>
      <h2 class="mt-3 font-medium text-4xl tracking-[-0.035em]">
        Chat with our friendly team!
      </h2>
      <p class="mt-3 text-lg text-muted-foreground md:text-xl">
        We'd love to hear from you. Please fill out this form or shoot us
        an email.
      </p>
      <div class="mt-16 flex flex-col gap-16 md:gap-10 lg:flex-row">
        <div class="grid w-full max-w-3xl grid-cols-1 gap-1 rounded-xl border bg-muted p-1 *:rounded-lg *:border *:bg-background *:p-6 sm:grid-cols-2 lg:col-span-2 dark:*:border-foreground/20">
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:border-foreground/20 dark:bg-foreground/10">
              <MailIcon />
            </div>
            <h3 class="mt-6 font-medium text-xl">Email</h3>
            <p class="my-2.5 text-muted-foreground">
              Our friendly team is here to help.
            </p>
            <a
              class="font-medium text-primary"
              href="mailto:akashmoradiya3444@gmail.com"
            >
              akashmoradiya3444@gmail.com
            </a>
          </div>
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <MessageCircle />
            </div>
            <h3 class="mt-6 font-medium text-xl">Live chat</h3>
            <p class="my-2.5 text-muted-foreground">
              Our friendly team is here to help.
            </p>
            <a class="font-medium text-primary" href="#">
              Start new chat
            </a>
          </div>
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <MapPinIcon />
            </div>
            <h3 class="mt-6 font-medium text-xl">Office</h3>
            <p class="my-2.5 text-muted-foreground">
              Come say hello at our office HQ.
            </p>
            <a
              class="font-medium text-primary"
              href="https://map.google.com"
              target="_blank"
            >
              100 Smith Street Collingwood <br /> VIC 3066 AU
            </a>
          </div>
          <div>
            <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
              <PhoneIcon />
            </div>
            <h3 class="mt-6 font-medium text-xl">Phone</h3>
            <p class="my-2.5 text-muted-foreground">
              Mon-Fri from 8am to 5pm.
            </p>
            <a
              class="font-medium text-primary"
              href="tel:akashmoradiya3444@gmail.com"
            >
              +1 (555) 000-0000
            </a>
          </div>
        </div>

        <!-- Form -->
        <div class="w-full max-w-lg rounded-xl border bg-muted p-1">
          <Card class="relative isolate rounded-lg bg-background shadow-none lg:ms-auto dark:border-foreground/20">
            <CardHeader class="gap-1">
              <CardTitle class="font-medium text-xl">Contact Us</CardTitle>
              <CardDescription class="text-base">
                We'd love to hear from you. Please fill out this form.
              </CardDescription>
            </CardHeader>
            <CardContent class="mt-2">
              <form>
                <div class="grid gap-x-8 gap-y-6 md:grid-cols-2">
                  <div class="col-span-2 sm:col-span-1">
                    <Label for="firstName">First Name</Label>
                    <Input
                      class="mt-2 bg-white shadow-none"
                      id="firstName"
                      placeholder="First name"
                    />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <Label for="lastName">Last Name</Label>
                    <Input
                      class="mt-2 bg-white shadow-none"
                      id="lastName"
                      placeholder="Last name"
                    />
                  </div>
                  <div class="col-span-2">
                    <Label for="email">Email</Label>
                    <Input
                      class="mt-2 bg-white shadow-none"
                      id="email"
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div class="col-span-2">
                    <Label for="message">Message</Label>
                    <Textarea
                      class="mt-2 bg-white shadow-none"
                      id="message"
                      placeholder="Message"
                      :rows="6"
                    />
                  </div>
                  <div class="col-span-2 flex items-center gap-2">
                    <Checkbox class="bg-background" id="acceptTerms" />
                    <Label class="gap-0" for="acceptTerms">
                      You agree to our
                      <a class="ml-1 underline" href="#">
                        terms and conditions
                      </a>
                      <span>.</span>
                    </Label>
                  </div>
                </div>
                <Button class="mt-6 w-full" size="lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
