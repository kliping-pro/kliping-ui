<script lang="ts">
export const description = "Ikon di atas namanya, tersusun ke bawah."
</script>

<script setup lang="ts">
import { ChevronsRight, Component, Home, Route } from '@lucide/vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList class="gap-5!">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <div class="flex flex-col items-center gap-1">
            <Home class="h-4 w-4" />
            Home
          </div>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <div class="flex flex-col items-center gap-1">
            <Component class="h-4 w-4" />
            Components
          </div>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>
          <div class="flex flex-col items-center gap-1">
            <Route class="h-4 w-4" />
            Breadcrumb
          </div>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
