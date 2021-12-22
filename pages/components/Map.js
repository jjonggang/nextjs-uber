import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = process.env.ACCESS_TOKEN;


const Map = (props) => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map", // container ID
            style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
            center: [-99.29011, 39.39172], // starting position [lng, lat]
            zoom: 3, // starting zoom
        });

        if (props.pickupCoordinates) {
            addToMap(map, props.pickupCoordinates)
        }
        if (props.dropoffCoordinates) {
            addToMap(map, props.dropoffCoordinates)
        }

        if (props.pickupCoordinates && props.dropoffCoordinates) {
            map.fitBounds([
                props.dropoffCoordinates,
                props.pickupCoordinates
            ], {
                padding: 60
            })
        }


    }, [props.pickupCoordinates, props.dropoffCoordinates])

    const addToMap = (map, coordinates) => {
        const marker1 = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    }

    return (
        <Wrapper id='map'>

        </Wrapper>
    )
}

export default Map

const Wrapper = tw.div`
flex-1 h-1/2
`
