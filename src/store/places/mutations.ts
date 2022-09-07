import { Feature } from '@/interfaces/places';
import { MutationTree } from 'vuex';
import { PlacesInterface } from './state';


const mutation: MutationTree<PlacesInterface> = {
    setLngLat( state: PlacesInterface, {lng,lat}:{lng:number,lat:number} ) {
        
        state.useLocation = [lng,lat]
        state.isLoading = false
        
    },

    setIsLoadingPlaces(state){
        state.isLoadingPlaces = true;
    },

    setPlaces(state, places: Feature[]) {
        state.places = places;
        state.isLoadingPlaces = false;
    },

}


export default mutation;