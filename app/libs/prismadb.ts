import { PrismaClient } from "@prisma/client";

`
Next.js 13 hot reloading can cause a bunch of these new PrismaClients
instances to be created, giving us warning in the terminal. This way we 
assign the PrismaClient to a global this variable which is not affected 
by hot reload.
`

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

