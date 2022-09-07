import { computed } from "vue";
import { StateInterface } from "@/store"
import { useStore } from "vuex"
import { Feature } from "@/interfaces/places";
import { LngLat } from "@/store/map/actions";

export const useMapStore = () => {

    const store =  useStore<StateInterface>();

    return{
        // State
        map: computed( () => store.state.map.map ),
        markers: computed( () => store.state.map.markers ),
        distance: computed( () => store.state.map.distance ),
        duration: computed( () => store.state.map.duration ),
        // Getters
        isMapReady: computed<boolean>( () => store.getters['map/isMapReady']),
        // Mutations
        setMap: ( map:mapboxgl.Map ) => store.commit('map/setMap', map),
        setPlaceMarkers: (places:Feature[]) => store.commit('map/setPlaceMarkers', places),
        getRoteBetweenOints: ( start: LngLat, end:LngLat ) => store.dispatch('map/getRoteBetweenOints', { start, end })
    }

}