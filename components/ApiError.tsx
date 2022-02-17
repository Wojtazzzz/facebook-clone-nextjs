import * as React from 'react';

import Image from 'next/image';


export const ApiError: React.FC = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-12">
            <Image
                width="150"
                height="150"
                src="/img/not_available.svg"
                alt="Fatal error"
            />

            <span className="text-2xl text-light-100 text-center font-bold mt-5">Something went wrong...</span>
            <span className="text-2xl text-light-100 text-center font-bold">Please try again later</span>
        </div>
    );
}