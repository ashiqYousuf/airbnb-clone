"use client"

import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: "This property has windmills!"
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: "This property is modern!"
    }
]

// Show Categories only on the Index page i.e '/'

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
                {
                    categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            selected={item.label === category}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default Categories;
