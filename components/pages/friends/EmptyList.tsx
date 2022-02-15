import * as React from 'react';

import Image from 'next/image';


interface EmptyListProps {
    title: string
}

export const EmptyList: React.FC<EmptyListProps> = ({ title }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-5 mt-12">
            <Image
                width="150"
                height="150"
                src="/img/empty_list.svg"
                alt="List is empty"
            />

            <span className="text-2xl text-light-100 font-bold">{title}</span>
        </div>
    );
}