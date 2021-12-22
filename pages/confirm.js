import React from 'react'
import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map from './components/Map'
import { useRouter } from 'next/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'

const Confirm = () => {
    const router = useRouter() //search에서 query받기
    const { pickup, dropoff } = router.query

    const [pickupCoordinates, setPickupCoordinates] = useState([0, 0])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0])

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: process.env.ACCESS_TOKEN,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setPickupCoordinates(data.features[0].center)
            })
        // ?access_token=
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token: process.env.ACCESS_TOKEN,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setDropoffCoordinates(data.features[0].center)
            })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    return (
        <div>
            <Wrapper>
                <ButtonContainer>
                    <Link href="/search">
                        <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                    </Link>
                </ButtonContainer>
                <Map
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
                />
                <RideContainer>
                    <RideSelector
                        pickupCoordinates={pickupCoordinates}
                        dropoffCoordinates={dropoffCoordinates}
                    />
                    <ConfirmButtonContainer>
                        <ConfirmButton>
                            Confirm UberX
                        </ConfirmButton>

                    </ConfirmButtonContainer>
                </RideContainer>
            </Wrapper>
        </div>
    )
}

export default Confirm

const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-xl
`

const ConfirmButtonContainer = tw.div`
border-t-2
`

const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`

const Wrapper = tw.div`
flex h-screen flex-col
`


const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md center-pointer
`

const BackButton = tw.img`
`