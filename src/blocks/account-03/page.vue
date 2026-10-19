<script lang="ts">
export const description = "Form informasi pribadi berseksi dengan select, date picker, dan kontak."
</script>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone } from '@internationalized/date'
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const birthDate = ref() as Ref<DateValue | undefined>

// Setara `format(date, "PPP")` dari date-fns, mis. "October 10th, 2024".
const formatPPP = (value: DateValue) => {
  const date = value.toDate(getLocalTimeZone())
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const day = date.getDate()
  const suffix = day % 100 >= 11 && day % 100 <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th'
  return `${month} ${day}${suffix}, ${date.getFullYear()}`
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="border-b pb-6">
        <h2 class="text-2xl font-semibold tracking-tight">
          Personal Information
        </h2>
        <p class="text-muted-foreground mt-2 text-sm">
          Manage your personal details and profile information. This
          information will be visible to other users on the platform.
        </p>
      </div>

      <form class="space-y-8">
        <!-- Basic Details Section -->
        <div class="space-y-6">
          <div>
            <h3 class="mb-4 text-sm font-medium">Basic Details</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label
                  for="firstName"
                  class="flex items-center gap-2"
                >
                  <UserIcon class="text-muted-foreground h-4 w-4" />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Emma"
                  default-value="Emma"
                />
              </div>
              <div class="space-y-2">
                <Label for="lastName" class="flex items-center gap-2">
                  <UserIcon class="text-muted-foreground h-4 w-4" />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Roberts"
                  default-value="Roberts"
                />
              </div>
            </div>
          </div>

          <!-- Professional Information -->
          <div>
            <h3 class="mb-4 text-sm font-medium">
              Professional Information
            </h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div class="space-y-2">
                <Label for="gender" class="flex items-center gap-2">
                  <UserIcon class="text-muted-foreground h-4 w-4" />
                  Gender
                </Label>
                <Select default-value="female">
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label class="flex items-center gap-2">
                  <CalendarIcon class="text-muted-foreground h-4 w-4" />
                  Birth Date
                </Label>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      class="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{ birthDate ? formatPPP(birthDate) : "Select a date" }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0" align="start">
                    <Calendar
                      v-model="birthDate"
                      initial-focus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div class="space-y-2">
                <Label
                  for="profession"
                  class="flex items-center gap-2"
                >
                  <BriefcaseIcon class="text-muted-foreground h-4 w-4" />
                  Profession
                </Label>
                <Select default-value="ui-ux">
                  <SelectTrigger id="profession">
                    <SelectValue placeholder="Select Profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                    <SelectItem value="frontend">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="fullstack">
                      Fullstack Developer
                    </SelectItem>
                    <SelectItem value="product-manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="data-scientist">
                      Data Scientist
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label
                  for="education"
                  class="flex items-center gap-2"
                >
                  <GraduationCapIcon class="text-muted-foreground h-4 w-4" />
                  Education
                </Label>
                <Select default-value="university">
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="masters">
                      Master's Degree
                    </SelectItem>
                    <SelectItem value="phd">Ph.D.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h3 class="mb-4 text-sm font-medium">Contact Information</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="email" class="flex items-center gap-2">
                  <MailIcon class="text-muted-foreground h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="emma@mail.com"
                  default-value="emma@mail.com"
                />
              </div>
              <div class="space-y-2">
                <Label
                  for="confirmEmail"
                  class="flex items-center gap-2"
                >
                  <MailIcon class="text-muted-foreground h-4 w-4" />
                  Confirm Email
                </Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="emma@mail.com"
                  default-value="emma@mail.com"
                />
              </div>
              <div class="space-y-2">
                <Label for="phone" class="flex items-center gap-2">
                  <PhoneIcon class="text-muted-foreground h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  default-value="+1 (555) 123-4567"
                />
              </div>
              <div class="space-y-2">
                <Label for="location" class="flex items-center gap-2">
                  <MapPinIcon class="text-muted-foreground h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  default-value="Florida, USA"
                />
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div>
            <h3 class="mb-4 text-sm font-medium">
              Additional Information
            </h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="language" class="flex items-center gap-2">
                  <GlobeIcon class="text-muted-foreground h-4 w-4" />
                  Preferred Language
                </Label>
                <Select default-value="english">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label for="timezone" class="flex items-center gap-2">
                  <GlobeIcon class="text-muted-foreground h-4 w-4" />
                  Timezone
                </Label>
                <Select default-value="est">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  </div>
</template>
