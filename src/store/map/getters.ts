import { GetterTree } from 'vuex';
import { MapInteface } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<MapInteface, StateInterface> = {
    isMapReady( state ) {
        return !!state.map;
    }
}



export default getters;