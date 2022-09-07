import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
       limit: 5,
       language: 'es',
       access_token: 'pk.eyJ1IjoibGNhcmJhbGxvIiwiYSI6ImNsN3B1M3IyMTBhcnUzbnBmdnFmdjR2OHcifQ.9k9OOjEOlFMMbir6XPk05g'
    }
})

export default searchApi