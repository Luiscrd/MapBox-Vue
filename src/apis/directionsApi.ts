import axios from 'axios'

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic',
    params: {
        alternatives: true,
        geometries: 'geojson',
       language: 'es',
       overview: 'full',
       steps: true,
       access_token: process.env.MAPBOX_KEY,
    }
})

export default directionsApi