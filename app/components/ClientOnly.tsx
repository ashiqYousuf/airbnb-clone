"use client";

import { useEffect, useState } from "react";

// This component solves hydration issues which were in experimental next.js 13
// This is a wrapper component.

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    )
}
 
export default ClientOnly;
