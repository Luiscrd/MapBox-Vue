import { ActionTree } from 'vuex';
import { MapInteface } from './state';
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';
import { Directions } from '@/interfaces/directions'

export type LngLat = [number,number]

const actions: ActionTree<MapInteface, StateInterface> = {
    async getRoteBetweenOints( { commit }, {start, end}:{start:LngLat, end:LngLat} ) {
        
        const resp = await directionsApi.get<Directions>(`${ start.join(',') };${ end.join(',') }`)

        commit('setDistanceDuration', {
            distance: resp.data.routes[0].distance,
            duration: resp.data.routes[0].duration
        })
        
        commit('setRoutePoyline',resp.data.routes[0].geometry.coordinates)
    }
}



export default actions;