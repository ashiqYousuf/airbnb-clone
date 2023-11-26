"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        // bathroomCount, guestCount, roomCount...etc can not go beyond 1
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="w-6 h-6 rounded-full border-[1px] border-rose-500 flex items-center justify-center text-white bg-rose-500 cursor-pointer hover:opacity-80 transition"
                >
                    <AiOutlineMinus />
                </div>
                <div className="font-bold text-xl text-neutral-800">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="w-6 h-6 rounded-full border-[1px] border-rose-500 flex items-center justify-center text-white bg-rose-500 cursor-pointer hover:opacity-80 transition"
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}
 
export default Counter;
