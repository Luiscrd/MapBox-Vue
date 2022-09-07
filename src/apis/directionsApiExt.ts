import axios from 'axios'

const directionsApiExt = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: true,
        annotations: 'distance%2Cduration%2Cspeed%2Ccongestion',
        geometries: 'geojson',
       language: 'es',
       overview: 'full',
       steps: true,
       access_token: 'pk.eyJ1IjoibGNhcmJhbGxvIiwiYSI6ImNsN3B1M3IyMTBhcnUzbnBmdnFmdjR2OHcifQ.9k9OOjEOlFMMbir6XPk05g'
    }
})

export default directionsApiExt