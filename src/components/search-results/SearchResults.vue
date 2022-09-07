<template>
  <div
    v-if="isLoadingPlaces"
    class="loading-map d-flex justify-content-center align-items-center"
  >
    <div class="text-center">
      <h3>Espere por favor</h3>
      <span>Cargando Busqueda...</span>
    </div>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      @click="onPlaceClick(place)"
      class="list-group-item list-group-item-action"
      :class="place.id === activePlace ? 'active' : ''"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ cutTextPlace(place.place_name) }}</p>
      <button
      class="btn"
      :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'"
      @click.self="getRouteDirections(place)"
      >Direcciones</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from "@/interfaces/places";
import { PlacesInterface } from "@/store/places/state";
import { computed, defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "SearchResults",
  setup() {

    const { map, setPlaceMarkers, getRoteBetweenOints, } = useMapStore();
    const {
      isLoaading,
      places,
      isLoadingPlaces,
      isUseLocationReady,
      SearchPlacesByTerm,
      userLocation,
    } = usePlacesStore();

    const cutTextPlace = (text:string) => {
        if (text.length > 50) {
        return text.substring(0,50)+'...';
      } else {
        return text
      }
    }
    
    const activePlace = ref('')

    watch(places,(newPlaces) => {
        activePlace.value = '';
        setPlaceMarkers(newPlaces);
        
    }) 

    

    return {
      isLoaading,
      places,
      isLoadingPlaces,
      isUseLocationReady,
      SearchPlacesByTerm,
      cutTextPlace,
      activePlace,
      map,
      userLocation,
      onPlaceClick: (palce:Feature) => {
        activePlace.value = palce.id
       const [lng, lat] = palce.center

        map.value?.flyTo({
            center: [lng, lat],
            zoom: 16,
        })
        
      },
      getRouteDirections: (palce:Feature) => {
         if (!userLocation.value) {
          alert('No se ha encontrado su localización')
          throw Error('No se ha encontrado su localización')
        }
        
        const [lng, lat] = palce.center

        const [startLng,startLat] = userLocation.value

        const start: [number,number] = [lng, lat];
        const end: [number, number] = [startLng,startLat];

        getRoteBetweenOints(start, end)
      }
      
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

li {
  cursor: pointer;
  padding: 10px;
}

h5 {
  text-align: left;
  font-size: 1em;
  font-weight: bold;
}

p {
  overflow: hidden;
  text-align: left;
  font-size: 0.8em;
}

button {
  font-size: 0.8em;
}
</style>