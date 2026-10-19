<!-- example: 2. Vertical Layout -->
<script setup lang="ts">
import { Marquee, MarqueeContent, MarqueeEdge, MarqueeItem } from '@/components/marquee'

const testimonials = [
  { name: 'Alex Johnson', role: 'Frontend Developer', company: 'TechCorp', avatar: 'AJ', content: 'This marquee component is incredibly smooth and easy to use. Perfect for showcasing our testimonials.' },
  { name: 'Sarah Chen', role: 'UI Designer', company: 'DesignStudio', avatar: 'SC', content: 'Love how customizable it is. The vertical layout works perfectly for our testimonials section.' },
  { name: 'Michael Rodriguez', role: 'Product Manager', company: 'StartupXYZ', avatar: 'MR', content: 'Great performance and accessibility features. Our users love the smooth animations.' },
  { name: 'Emily Davis', role: 'Full Stack Developer', company: 'WebSolutions', avatar: 'ED', content: 'The API is intuitive and the documentation is excellent. Highly recommended.' },
]
</script>

<template>
  <Marquee side="bottom" class="h-80 w-full max-w-md">
    <MarqueeContent>
      <MarqueeItem
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="flex w-full flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {{ testimonial.avatar }}
          </div>
          <div class="flex flex-col">
            <div class="text-sm font-medium">
              {{ testimonial.name }}
            </div>
            <div class="text-xs text-muted-foreground">
              {{ testimonial.role }} at {{ testimonial.company }}
            </div>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-muted-foreground">
          "{{ testimonial.content }}"
        </p>
      </MarqueeItem>
    </MarqueeContent>
    <MarqueeEdge side="top" />
    <MarqueeEdge side="bottom" />
  </Marquee>
</template>
