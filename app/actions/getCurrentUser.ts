import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

`
This is not an API call, this is direct communication with our DB through our
Server Components.
`

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try{
        const session = await getSession();

        if (!session?.user?.email) {
            // If Session doesn't exist
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || "",
        }
    } catch(error: any) {
        return null;
    }
}
