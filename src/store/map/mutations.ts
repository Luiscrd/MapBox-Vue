import { MutationTree } from 'vuex';
import { MapInteface } from './state';
import mapboxgl from "mapbox-gl";
import { Feature } from '@/interfaces/places';


const mutation: MutationTree<MapInteface> = {
    setMap(state: MapInteface, map: mapboxgl.Map) {
        state.map = map;     
    },

    setDistanceDuration(state, {distance, duration}:{distance:number, duration:number}){
        
        let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms = kms / 100;

        state.distance = kms;
        state.duration = Math.floor( duration / 60)
    },

    setPlaceMarkers(state, places: Feature[]) {

        if (!state.map) return
        state.markers.forEach(marker => marker.remove())
        state.markers = [];

        for (const place of places) {
            const [lng, lat] = place.center;

            const popup = new mapboxgl.Popup({ offset: [0, -25] })
                .setLngLat([lng, lat])
                .setHTML(`
                        <h4>${place.text}</h4>
                        <p>${place.place_name_es}</p>
                        <p>${[lng, lat]}</p>
                        `)

            const marker = new mapboxgl.Marker({
                color: "#0D6EFD",
                draggable: true,
              })
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(state.map)
        }
    },

    setRoutePoyline(state, coords:number[][]) {
       const start = coords[0];
       const end = coords[coords.length - 1]

       // Definir los bounds

       const bounds = new mapboxgl.LngLatBounds(
        [start[0], start[1]],
        [end[0], end[1]],
       )

       // Agregamos cada punto al bounds

       for(const coord of coords){
            const newCord: [number,number] = [coord[0],coord[1]]
            bounds.extend( newCord );
       }

       state.map?.fitBounds( bounds, {
        padding: 300
       } )

       // Polyline
       const sourceData: mapboxgl.AnySourceData = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {

                    },
                    geometry:{
                        type: 'LineString',
                        coordinates: coords
                    }
                }
            ]
        }
       }

       if (state.map?.getLayer('RouteString')) {
        state.map.removeLayer('RouteString')
        state.map.removeSource('RouteString')
       }

       state.map?.addSource('RouteString', sourceData)
 
       state.map?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
            'line-cap': 'round',
            'line-join': 'round', 
        },
        paint: {
            'line-color': '#0D6EFD',
            'line-width': 4
        }
       })
    }
}


export default mutation;