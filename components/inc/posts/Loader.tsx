import { useEffect, useState } from 'react';
import { SkeletonLoading } from '@components/inc/SkeletonLoading';
import { getRandomInt } from '@utils/getRandomInt';
import { ListLoader } from '@components/inc/ListLoader';

export const Loader = () => {
    return (
        <ListLoader testId="posts-loadingLoader" count={15} styles="flex flex-col gap-2 md:gap-3">
            <SingleLoading />
        </ListLoader>
    );
};

const SingleLoading = () => {
    const [randomWidth, setRandomWidth] = useState({
        name: 0,
        date: 0,
        content: 0,
    });

    useEffect(() => {
        setRandomWidth({
            name: getRandomInt(50, 140),
            date: getRandomInt(60, 160),
            content: getRandomInt(70, 100),
        });
    }, []);

    return (
        <div className="w-full bg-dark-200 rounded-lg">
            <div className="w-full flex justify-between p-4 pb-0">
                <div className="flex gap-3">
                    <div className="text-sm text-light-50 font-medium">
                        <SkeletonLoading classNames="w-[40px] h-[40px]" isCircle />
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                        <SkeletonLoading styles={{ width: randomWidth.name }} classNames="h-[12px]" />

                        <span className="text-xs text-light-100">
                            <SkeletonLoading styles={{ width: randomWidth.date }} classNames="h-[10px]" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full p-4">
                <SkeletonLoading styles={{ width: `${randomWidth.content}%` }} classNames="h-[54px]" />
            </div>

            <div className="w-full flex gap-4 justify-evenly border-t-2 border-t-dark-100 p-2">
                <div className="w-1/3 py-2">
                    <SkeletonLoading classNames="w-full h-[35px]" />
                </div>

                <div className="w-1/3 py-2">
                    <SkeletonLoading classNames="w-full h-[35px]" />
                </div>

                <div className="w-1/3 py-2">
                    <SkeletonLoading classNames="w-full h-[35px]" />
                </div>
            </div>
        </div>
    );
};
