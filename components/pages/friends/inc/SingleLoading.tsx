import { useState, useEffect } from 'react';

import { SkeletonLoading } from '@components/inc/SkeletonLoading';

import { getRandomInt } from '@utils/getRandomInt';

export const SingleLoading = () => {
    const [width, setWidth] = useState(180);

    useEffect(() => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 1024) {
            setWidth(getRandomInt(220, 320));
        } else if (windowWidth > 768) {
            setWidth(getRandomInt(150, 250));
        } else {
            setWidth(getRandomInt(120, 180));
        }
    }, []);

    return (
        <div className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
            <SkeletonLoading classNames="w-[80px] h-[80px]" isCircle />
            <SkeletonLoading styles={{ width }} classNames="w-[150px] md:w-[180px] lg:w-[240px] h-[30px]" />
            <SkeletonLoading classNames="hidden md:block w-[150px] h-[50px] ml-auto" />
        </div>
    );
};
