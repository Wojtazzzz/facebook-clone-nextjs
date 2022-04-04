import { useState, useEffect } from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';

import { getRandomInt } from '@lib/getRandomInt';

export const ListSingleLoader = () => {
    const [width, setWidth] = useState(100);

    useEffect(() => {
        setWidth(getRandomInt(100, 200));
    }, []);
    return (
        <div className="w-full h-[72px] flex gap-3 selection:rounded-lg cursor-pointer p-2">
            <SkeletonLoading classNames="w-[56px] h-[56px]" isCircle />
            <SkeletonLoading styles={{ width }} classNames="h-[20px]" />
        </div>
    );
};
