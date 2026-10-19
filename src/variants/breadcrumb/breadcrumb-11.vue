<script lang="ts">
export const description = "Tiap jenjangnya berbentuk lencana."
</script>

<script setup lang="ts">
import { ChevronsRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
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
          <Badge
            class="rounded-full font-medium shadow-none"
            variant="secondary"
          >
            Home
          </Badge>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <Badge
            class="rounded-full font-medium shadow-none"
            variant="secondary"
          >
            Components
          </Badge>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <ChevronsRight />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>
          <Badge class="rounded-full shadow-none">Breadcrumb</Badge>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
