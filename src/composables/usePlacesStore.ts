import { computed, onMounted } from "vue";
import { StateInterface } from "@/store"
import { useStore } from "vuex"

export const usePlacesStore = () => {

    const store =  useStore<StateInterface>();

    onMounted( () => {
        if (!store.getters['places/isUseLocationReady']) {
            store.dispatch('places/getInitialLocation')
        }
    })

    return{
        // State
        isLoaading: computed( () => store.state.places.isLoading ),
        userLocation: computed( () => store.state.places.useLocation ),
        places: computed( () => store.state.places.places),
        isLoadingPlaces: computed( () => store.state.places.isLoading ),
        // Getters
        isUseLocationReady: computed<boolean>( () => store.getters['places/isUseLocationReady'] ),
        // Actions
        SearchPlacesByTerm: (query = '') => store.dispatch('places/SearchPlacesByTerm', query)
    }
}