<template>
  <div
    v-if="!isUseLocationReady"
    class="loading-map d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h3>Espere por favor</h3>
      <span>Localizando...</span>
    </div>
  </div>
  <div v-show="isUseLocationReady" class="map-container" ref="mapElemnt"></div>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from "@/composables";
import mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "MapView",
  setup() {
    const mapElemnt = ref<HTMLDivElement>();
    const { userLocation, isUseLocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElemnt.value) throw new Error("Div Element no existe");
      if (!userLocation.value) throw new Error("User Location no existe");
      await Promise.resolve();
      const map = new mapboxgl.Map({
        container: mapElemnt.value, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 16, // starting zoom
      });

      const myLocationPopup = new mapboxgl.Popup({
        offset: [0, -25],
      }).setLngLat(userLocation.value).setHTML(`
      <h4>Aquí estoy</h4>
      <p>Actualmente en San Martín</p>
      <p>${userLocation.value}</p>
      `);

      const myLocationMarker = new mapboxgl.Marker({
        color: "#0D6EFD",
        draggable: true,
      })
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      
      
      setMap(map);
    };

    onMounted(() => {
      if (isUseLocationReady.value) return initMap();
    });

    watch(isUseLocationReady, (newVal) => {
      if (isUseLocationReady.value) initMap();
    });

    return {
      userLocation,
      isUseLocationReady,
      mapElemnt,
    };
  },
});
</script>

<style scoped>
.loading-map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
}

.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
