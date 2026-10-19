<script lang="ts">
export const description = "Ikon di depan tiap namanya."
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
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <Home class="h-4 w-4" />
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <Component class="mr-1 inline h-4 w-4" /> Components
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>
          <Route class="mr-1 inline h-4 w-4" /> Breadcrumb
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
