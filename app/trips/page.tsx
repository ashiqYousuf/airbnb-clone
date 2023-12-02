import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


const TripsPage = async () => {
    console.log("TRIPS PAGE STARTED!")
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }
    console.log("GET MY TRIPS")
    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (!reservations || reservations.length === 0) {
        return (
            <EmptyState
                title="No trips Found"
                subtitle="Looks like you have not reserved any trips"
            />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage;
