import { ActionTree } from 'vuex';
import { PlacesInterface } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { Feature, PlacesResponse } from '@/interfaces/places'


const actions: ActionTree<PlacesInterface, StateInterface> = {
    getInitialLocation( { commit } ) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => commit('setLngLat', { lng:coords.longitude, lat: coords.latitude } ),
            ( err ) => {
                console.error(err)
                throw new Error('No geolocation')
            }
        )
    },

    async SearchPlacesByTerm( {commit, state}, query:string ):Promise<Feature[]> {
        
        if (query.length === 0) {
            commit('setPlaces', []);
            return []
        }

        if (!state.useLocation) {
            alert('No se encuentra la hubicación')
            throw new Error('No se encuentra la hubicación')
        }

        commit('setIsLoadingPlaces')

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`,{
            params: {
                proximity: state.useLocation?.join(',')
            }
        })

        commit('setPlaces', resp.data.features);

        
        return resp.data.features;
    }
}



export default actions;