import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

// We can't use hooks inside server componnets, we can only use actions here!
// But there's a way to capture dynamic resource endpoints from server components as follows

const ListingPage = async (
    { params }: { params: IParams }
) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if (!listing) {
        return <EmptyState />
    }
    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    );
}
 
export default ListingPage;
