import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Skeleton } from "@chakra-ui/react";
import fetcher from "@/utils/fetcher";
import Layout from "@/components/Layout";
import VolunteerSkeleton from "@/components/VolunteerSkeleton";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Text,
  Link,
  Avatar,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import googleMapStyles from "../../components/googleMapStyles";

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

function Proj() {
  const router = useRouter();
  const { pid } = router.query;

  if (!pid) {
    return <></>;
  }

  var data = useSWR("/api/project/" + pid, fetcher).data;

  // Map markers
  const [markers, setMarkers] = useState([
    {},
  ]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  });

  if (loadError) return <Layout>error</Layout>;
  if (!isLoaded) return <></>;
  //

  if (data) {
    const {
      url,
      name,
      projectFocus,
      startDate,
      endDate,
      country,
      city,
      requiredVolunteers,
    } = data;

    // setMarkers({ lat: 37.76831279411594, lng: -122.44127623053058 });

    return (
      <Layout>
        <Box backgroundColor="gray.100" h="100vh">
          <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink>{projectFocus}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  {startDate} to {endDate}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
              <Heading mb={8}>{name}</Heading>
              <Button
                fontWeight="medium"
                maxW="200px"
                backgroundColor="gray.900"
                color="white"
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                + Join Project
              </Button>
            </Flex>
            <Flex align="center" justify="center">
              <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={mapDefaultCenter}
                options={mapOptions}
                onLoad={onMapLoad}
              >
                {markers.map((marker) => (
                  <Marker
                    key={`${marker.lat}-${marker.lng}`}
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
                    <p>
                      Description text{" "}
                      {`${selectedMarker.lat}, ${selectedMarker.lng}`}
                    </p>
                  </InfoWindow>
                ) : null}
              </GoogleMap>
            </Flex>
          </Flex>
        </Box>
      </Layout>
    );
  }

  return (
    <Flex justify="center">
      <Skeleton w="80vw" h="400px" />
    </Flex>
  );
}

export default Proj;
