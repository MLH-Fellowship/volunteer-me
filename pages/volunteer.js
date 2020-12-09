import Head from "next/head";
import EmptyState from "@/components/EmptyState";
import ProjectTable from "@/components/ProjectTableUnfiltered";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import React, { useState } from "react";
import { Flex, Heading, Divider, Text } from "@chakra-ui/react";
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

const Volunteer = () => {
  const { data } = useSWR("/api/projects", fetcher);

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

  return (
    <>
      <Head>
        <title>Volunteer | Volunteer.me</title>
      </Head>
      <Layout>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          <Heading mb={8}>Volunteer</Heading>
          <Flex align="center" justify="center">
            {/* MAPS */}
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={{ lat: data.projects[0].lat, lng: data.projects[0].lng }}
              options={mapOptions}
              onLoad={onMapLoad}
            >
              {data.projects.map((marker) => (
                <Marker
                  key={`${marker.id}+${marker.lat}-${marker.lng}`}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => setSelectedMarker(marker)}
                />
              ))}
              {selectedMarker ? (
                <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  {/* Description text{" "}

                  {`${selectedMarker.lat}, ${selectedMarker.lng}`} */}
                  <>
                    <h5>
                      {selectedMarker.name}
                    </h5>
                    <Divider />
                    <Text mt={2} minW="100px">
                      {selectedMarker.description}
                    </Text>
                  </>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          </Flex>
          {/* TABLE OF PROJECTS */}
          <br />
          {selectedMarker ? (
            <ProjectTable projects={[selectedMarker]} />
          ) : (
              <>
                <Heading as="h5" size="md" my={8}>Top Projects</Heading>
                <Flex mt={4} align="center" justify="center">
                  {data.projects.length != 0 ? (
                    <ProjectTable projects={data.projects} />
                  ) : (
                      <EmptyState />
                    )}
                </Flex>
              </>
            )}
        </Flex>
      </Layout>
    </>
  );
};

export default Volunteer;
