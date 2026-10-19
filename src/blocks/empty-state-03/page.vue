<script lang="ts">
export const description = "Keadaan kosong bertab dengan saran isi."
</script>

<script setup lang="ts">
import {
  BadgeDollarSign,
  CreditCard,
  ImportIcon,
  PlusIcon,
  Receipt,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="px-6 py-10">
    <div class="mx-auto max-w-lg">
      <Tabs defaultValue="invoices">
        <!-- Tiga tab berikon butuh ±360px, tidak muat di layar ponsel. Di
             bawah sm daftarnya membungkus ke baris kedua (tinggi tabnya
             dikunci karena h-full tab tidak berlaku pada daftar h-auto)
             alih-alih memotong tab terakhir. -->
        <TabsList
          :class="cn(
            'mb-3 max-w-full justify-start bg-transparent p-0 max-sm:h-auto max-sm:min-h-9 max-sm:flex-wrap max-sm:gap-y-1 max-sm:*:h-8.75 max-sm:*:flex-none',
            '*:px-3 *:text-muted-foreground *:data-[state=active]:bg-muted *:data-[state=active]:text-foreground *:data-[state=active]:shadow-none'
          )"
        >
          <TabsTrigger value="invoices">
            <Receipt /> Invoices
          </TabsTrigger>
          <TabsTrigger value="payments">
            <BadgeDollarSign /> Payments
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <CreditCard /> Subscriptions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Empty class="rounded-xl border bg-muted/30 py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Receipt />
              </EmptyMedia>
              <EmptyTitle>No Invoices Yet</EmptyTitle>
              <EmptyDescription>
                You haven't created any invoices yet. Get started by
                creating your first invoice.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div class="flex flex-wrap gap-2 *:mx-auto">
                <Button>
                  <PlusIcon /> Create Invoice
                </Button>
                <Button variant="outline">
                  <ImportIcon /> Import Invoice
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </TabsContent>

        <TabsContent value="payments">
          <Empty class="rounded-xl border bg-muted/30 py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BadgeDollarSign />
              </EmptyMedia>
              <EmptyTitle>No Payments Yet</EmptyTitle>
              <EmptyDescription>
                You haven't received any payments yet. Payments will
                appear here once your invoices are paid.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div class="flex flex-wrap gap-2 *:mx-auto">
                <Button>
                  <PlusIcon /> Record Payment
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Empty class="rounded-xl border bg-muted/30 py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CreditCard />
              </EmptyMedia>
              <EmptyTitle>No Subscriptions Yet</EmptyTitle>
              <EmptyDescription>
                You don't have any active subscriptions. Create recurring
                billing plans for your customers.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div class="flex flex-wrap gap-2 *:mx-auto">
                <Button>
                  <PlusIcon /> Create Subscription
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
