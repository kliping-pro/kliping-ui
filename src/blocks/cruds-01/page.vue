<script lang="ts">
export const description = "Form edit produk pakaian dengan nama, merek, harga, kategori, dan detail."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <section class="grid min-h-screen place-items-center py-16">
    <Card class="mx-auto w-full max-w-2xl p-6 lg:p-8">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold">Edit Apparel Item</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Update product information, pricing, and categorization for your
          fashion inventory.
        </p>
      </div>
      <form action="#" class="space-y-6">
        <div class="space-y-2">
          <Label for="productName">Product Name</Label>
          <Input
            id="productName"
            name="productName"
            type="text"
            placeholder="e.g. Slim Fit Denim Jacket"
          />
        </div>

        <div class="space-y-2">
          <Label for="brand">Designer Brand</Label>
          <Input
            id="brand"
            name="brand"
            type="text"
            placeholder="e.g. Balenciaga"
          />
        </div>

        <div class="space-y-2">
          <Label for="price">Retail Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="e.g. 199"
          />
        </div>

        <div class="space-y-2">
          <Label for="category">Category</Label>
          <Select name="category">
            <SelectTrigger id="category" class="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outerwear">Outerwear</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="footwear">Footwear</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label for="description">Product Details</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Material, fit, washing instructions..."
            :rows="4"
          />
        </div>

        <div class="flex gap-4">
          <Button type="submit" class="flex-1">
            Save Changes
          </Button>
          <Button type="button" variant="destructive" class="flex-1">
            Remove Item
          </Button>
        </div>
      </form>
    </Card>
  </section>
</template>
