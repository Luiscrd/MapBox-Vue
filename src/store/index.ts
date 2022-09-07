import { createStore, mapState } from 'vuex';

// My custom modules
import placesModule from './places/index';
import { PlacesInterface } from './places/state';
import mapModule from './map/index';
import { MapInteface } from './map/state';



export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  places: PlacesInterface;
  map: MapInteface
}

export default createStore<StateInterface>({
  modules: {
    // example: exampleModule
    places: placesModule,
    map: mapModule
  }
})
