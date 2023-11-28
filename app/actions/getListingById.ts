import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            // Get user also who owns the listing
            include: {
                user: true,
            }
        });

        if (!listing) {
            return null;
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || "",
            }
        }
    } catch(error: any) {
        // TODO:- Changed his approach
        return null;
    }
}
