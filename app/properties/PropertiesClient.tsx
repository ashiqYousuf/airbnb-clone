"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    // cancel reservation
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Listing deleted");
            router.refresh();
        })
        .catch((error: Error) => {
            toast.error(error?.message);
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router]);

    return (
        <div className="mt-6">
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings.map((listing: SafeListing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
        </div>
    );
}
 
export default PropertiesClient;
