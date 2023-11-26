"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    icon: Icon,
    label,
    selected
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'bg-rose-600' : ''}
                ${selected ? 'text-white' : ''}
            `}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
}
 
export default CategoryInput;
