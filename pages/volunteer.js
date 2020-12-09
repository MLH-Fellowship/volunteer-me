import Head from "next/head";
import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import DashboardShell from "@/components/DashboardShell";
import ProjectTableSkeleton from "@/components/ProjectTableSkeleton";
import ProjectTable from "@/components/ProjectTable";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import React, { useState } from "react";
import { Flex, Heading, Box } from "@chakra-ui/react";
import Footer from "@/components/Footer";
// G MAP imports
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import googleMapStyles from "../components/googleMapStyles";
import Layout from "@/components/Layout";
import VolunteerSkeleton from "@/components/VolunteerSkeleton";

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
  const { data } = useSWR("/api/projects", fetcher);

  // Map markers
  // const [markers, setMarkers] = useState([
  //   {
  //     lat: 37.774929,
  //     lng: -122.419418,
  //   },
  //   {
  //     lat: 37.77213900951256,
  //     lng: -122.47091779594122,
  //   },
  //   // buenavista park
  //   { lat: 37.76831279411594, lng: -122.44127623053058 },
  // ]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  if (loadError)
    return (
      <Layout>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          <Heading mb={8}>Volunteer</Heading>
        </Flex>
        <VolunteerSkeleton />
        <p>There was an error loading the map</p>
      </Layout>
    );
  if (!isLoaded)
    return (
      <Layout>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          <Heading mb={8}>Volunteer</Heading>
        </Flex>
        <VolunteerSkeleton />
      </Layout>
    );

  if (!data) {
    return <></>;
  }
  const arr = data.projects.map(p => ({lng: p.lng, lat: p.lat}))
  console.log(arr)

  return (
    <>
      <Head>
        <title>Volunteer | Volunteer.me</title>
      </Head>
      <Layout>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          <Heading mb={8}>Volunteer</Heading>
          <Flex align="center" justify="center">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={mapDefaultCenter}
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {arr.map((marker) => (
                <Marker
                  key={`${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  // onClick={() => setSelectedMarker(arr)}
                />
              ))}
              {/* {selectedMarker ? (
                <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  <p>
                    Description text{" "}
                    {`${selectedMarker.lat}, ${selectedMarker.lng}`}
                  </p>
                </InfoWindow>
              ) : null} */}
            </GoogleMap>
          </Flex>
          <br />
          <Flex align="center" justify="center">
            {data.projects.length != 0 ? (
              <ProjectTable projects={data.projects} />
            ) : (
              <EmptyState />
            )}
          </Flex>
          <Footer />
        </Flex>
      </Layout>
    </>
  );
};

export default Volunteer;
