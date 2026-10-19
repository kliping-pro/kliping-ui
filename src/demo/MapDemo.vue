<script setup lang="ts">
import { Map, MapControls, MapMarker, MapRoute, MarkerContent, MarkerLabel, MarkerPopup, MarkerTooltip } from '@/components/map'

const cities = [
  { name: 'London', country: 'United Kingdom', population: '8.9M', lng: -0.1276, lat: 51.5072 },
  { name: 'Paris', country: 'France', population: '2.1M', lng: 2.3522, lat: 48.8566 },
  { name: 'Brussels', country: 'Belgium', population: '1.2M', lng: 4.3517, lat: 50.8503 },
  { name: 'Amsterdam', country: 'Netherlands', population: '0.9M', lng: 4.9041, lat: 52.3676 },
]

const route = cities.map(city => [city.lng, city.lat] as [number, number])
</script>

<template>
  <div class="h-[400px] w-full overflow-hidden rounded-lg border">
    <Map :center="[2.2, 50.6]" :zoom="5">
      <MapRoute id="eurostar" :coordinates="route" :dash-array="[2, 1]" :width="3" />

      <MapMarker v-for="city in cities" :key="city.name" :latitude="city.lat" :longitude="city.lng">
        <MarkerContent />
        <MarkerLabel position="bottom">{{ city.name }}</MarkerLabel>
        <MarkerTooltip>Click for details</MarkerTooltip>
        <MarkerPopup class="w-48">
          <p class="font-medium">{{ city.name }}</p>
          <p class="text-muted-foreground text-xs">{{ city.country }}</p>
          <p class="mt-2 text-xs">Population: {{ city.population }}</p>
        </MarkerPopup>
      </MapMarker>

      <MapControls show-compass show-fullscreen show-locate />
    </Map>
  </div>
</template>
