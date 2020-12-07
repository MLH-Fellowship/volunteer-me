import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell';
import ProjectTableSkeleton from '@/components/ProjectTableSkeleton';
import ProjectTable from '@/components/ProjectTable';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import React, { useState } from "react"
import { Flex, Heading } from "@chakra-ui/react"

// G MAP imports
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import googleMapStyles from '../components/googleMapStyles';

// Map Default size
const mapContainerStyle = {
    height: "400px",
    width: "80vw",
};
const mapOptions = {
    styles: googleMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
const mapDefaultCenter = {
    //   San Francisco Coords
    lat: 37.774929,
    lng: -122.419418,
};

const Volunteer = () => {
    const auth = useAuth();
    const { data } = useSWR('/api/projects', fetcher);
    // Map markers
    const [markers, setMarkers] = useState([{
        lat: 37.774929,
        lng: -122.419418,
    },
    {
        lat: 37.77213900951256,
        lng: -122.47091779594122
    },
    // buenavista park
    { lat: 37.76831279411594, lng: -122.44127623053058 },
    ]);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    })

    // TODO: Change these returns for skeletons
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";




    return (
        <>
            <Head>
                <title>Volunteer | Volunteer.me</title>
            </Head>
            <DashboardShell>
                <Flex justifyContent="space-between">
                    <Heading mb={8}>Volunteer</Heading>
                </Flex>
                <Flex align="center" justify="center">
                    <GoogleMap
                        id="map"
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={mapDefaultCenter}
                        options={mapOptions}
                        // onClick={onMapClick}
                        onLoad={onMapLoad}
                    >
                        {markers.map(marker => (
                            <Marker
                                key={`${marker.lat}-${marker.lng}`}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => setSelectedMarker(marker)}
                            />
                        ))}
                        {selectedMarker ? (
                            <InfoWindow
                                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                                onCloseClick={() => {
                                    setSelectedMarker(null);
                                }}
                            >
                                <p>Description text {`${selectedMarker.lat}, ${selectedMarker.lng}`}</p>
                            </InfoWindow>
                        ) : null}
                    </GoogleMap>
                </Flex>
            </DashboardShell>

        </>

    );
};

export default Volunteer;