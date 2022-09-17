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
       access_token: process.env.MAPBOX_KEY2,
    }
})

export default directionsApiExt