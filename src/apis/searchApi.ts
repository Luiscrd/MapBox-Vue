import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
       limit: 5,
       language: 'es',
       access_token: process.env.MAPBOX_KEY3,
    }
})

export default searchApi