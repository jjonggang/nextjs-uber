import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import tw from 'tailwind-styled-components'
import { carList } from '../data/carList'
import Link from 'next/link'


// get ride duration from MAPBOX API
// 1. pickupCoordinates
// 2. dropoffCoordinates

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
    const [rideDuration, setRideDuration] = useState(0)
    useEffect(() => {
        //https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoicWtyd2hkcnVkMDAiLCJhIjoiY2t4ZThuOGp4NGoxdzJwcDk0YnJqZThkYyJ9.L-5ljZsWzokGUqLK8uVnGQ
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=${process.env.ACCESS_TOKEN}`)
            .then(res => res.json())
            .then(data => {
                setRideDuration(data.routes[0].duration / 100)
            })
    }, [pickupCoordinates, dropoffCoordinates])

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{(rideDuration * car.multiplier).toFixed()} min away</Time>
                        </CarDetails>
                        <Price>{'$', (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}

            </CarList>
        </Wrapper>
    )
}

export default RideSelector

const CarDetails = tw.div`
            flex-1
            `

const Service = tw.div`
            font-medium
            `

const Time = tw.div`
            text-xs text-blue-500
            `

const Price = tw.div`
            text-sm
            `

const CarImage = tw.img`
            h-14 mr-4
            `

const Car = tw.div`
            flex p-4 items-center
            `

const Title = tw.div`
            text-gray-500 text-center text-xs py-2
            `

const CarList = tw.div`
            overflow-y-scroll
            `

const Wrapper = tw.div`
            flex-1 overflow-y-scroll flex flex-col
            `
