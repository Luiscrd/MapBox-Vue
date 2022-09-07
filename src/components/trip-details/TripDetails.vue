<template>
  <div v-if="distance && duration" class="trip-container column">
    <div class="col">Distancia: <strong>{{ distance }} Km</strong></div>
    <div class="col">Duración: <strong>{{ duration }} Minutos</strong></div>
  </div>
</template>

<script lang="ts">
import { useMapStore } from "@/composables";
import { computed, defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "TripDetails",
  setup() {
    const { distance, duration } = useMapStore();
    return {
      distance,
      duration,
    };
  },
});
</script>

<style scoped>
.trip-container {
  padding: 10px;
  position: fixed;
  bottom: 30px;
  left: 30px;
  border-radius: 10px;
  background-color: white;
  font-size: 1em;
  width: 200px;
  text-align: center;
  z-index: 11000;
}

strong {
  color: #0d6efd;
}
</style>