<template>
  <button v-if="isBtnReady" @click="onMyLocationClick" class="btn btn-primary">Ir a mi hubicación</button>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from "@/composables";
import { computed, defineComponent } from "vue";
export default defineComponent({
    name: 'MyLocationBtn',
    setup() {

        const { userLocation, isUseLocationReady } = usePlacesStore()
        const { map, isMapReady } = useMapStore()
        return{
            isBtnReady: computed<boolean>( () => isUseLocationReady.value && isMapReady.value ),
            onMyLocationClick: () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 16
                })
            }
        }
    }
}) 
</script>

<style scoped>
button {
    position: fixed;
    top: 30px;
    right: 30px;
}
</style>