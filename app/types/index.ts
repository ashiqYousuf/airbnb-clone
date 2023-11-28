import { Listing, User } from "@prisma/client";

// We are sanitizing data by not sending Date objects to the client components!

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string;
};
