import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell';
import ProjectTableSkeleton from '@/components/ProjectTableSkeleton';
import ProjectTable from '@/components/ProjectTable';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

// G MAP imports
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import googleMapStyles from '../components/googleMapStyles';

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
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

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    // TODO: Change these returns for skeletons
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <>
            <Head>
                <title>Volunteer | Volunteer.me</title>
            </Head>
            <DashboardShell>
                <h1>Volunteer</h1>
            </DashboardShell>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={mapDefaultCenter}
                options={mapOptions}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
            ></GoogleMap>

        </>

    );
};

export default Volunteer;