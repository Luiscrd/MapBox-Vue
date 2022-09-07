import axios from 'axios'

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic',
    params: {
        alternatives: true,
        geometries: 'geojson',
       language: 'es',
       overview: 'full',
       steps: true,
       access_token: 'pk.eyJ1IjoibGNhcmJhbGxvIiwiYSI6ImNsN3B1M3IyMTBhcnUzbnBmdnFmdjR2OHcifQ.9k9OOjEOlFMMbir6XPk05g'
    }
})

export default directionsApi