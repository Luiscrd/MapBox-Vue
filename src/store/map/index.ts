import { Module } from 'vuex';
import { StateInterface } from '../index';

import state, { MapInteface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';


const mapModule: Module<MapInteface, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}


export default mapModule;