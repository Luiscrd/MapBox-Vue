import mapboxgl from "mapbox-gl";

export interface MapInteface {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

function state(): MapInteface {
    return {
        map: undefined,
        markers: [],
        distance: undefined,
        duration: undefined,
    }
}

export default state;