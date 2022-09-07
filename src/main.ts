import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoibGNhcmJhbGxvIiwiYSI6ImNsN3B1M3IyMTBhcnUzbnBmdnFmdjR2OHcifQ.9k9OOjEOlFMMbir6XPk05g';

if ( !navigator.geolocation ){
    alert('Tu navegador o soporta la geoloalización')
    throw new Error('Tu navegador o soporta la geoloalización')
}

createApp(App)
.use(store)
.use(router)
.mount('#app')
