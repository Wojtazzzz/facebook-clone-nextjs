import { ListLoader } from '@components/inc/ListLoader';
import { useState, useEffect } from 'react';
import { SkeletonLoading } from '@components/inc/SkeletonLoading';
import { getRandomInt } from '@utils/getRandomInt';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId = '' }: LoaderProps) => {
    return (
        <ListLoader testId={testId} count={6}>
            <SingleLoading />
        </ListLoader>
    );
};

const SingleLoading = () => {
    const [width, setWidth] = useState(100);

    useEffect(() => {
        setWidth(getRandomInt(100, 200));
    }, []);

    return (
        <div className="w-full h-[72px] flex gap-3 selection:rounded-lg cursor-pointer p-2">
            <div>
                <SkeletonLoading classNames="w-[56px] h-[56px]" isCircle />
            </div>

            <SkeletonLoading styles={{ width }} classNames="h-[20px]" />
        </div>
    );
};
