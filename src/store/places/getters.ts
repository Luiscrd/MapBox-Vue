import { GetterTree } from 'vuex';
import { PlacesInterface } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<PlacesInterface, StateInterface> = {
    isUseLocationReady( state ) {
        return !!state.useLocation
    }
}



export default getters;