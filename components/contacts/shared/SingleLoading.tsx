import { SkeletonLoading } from '@components/SkeletonLoading';

import { getRandomInt } from '@utils/getRandomInt';

export const SingleLoading = () => {
    const width = getRandomInt(60, 140);

    return (
        <div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
            <SkeletonLoading classNames="w-[36px] h-[36px]" isCircle />
            <SkeletonLoading styles={{ width }} classNames="h-[20px]" />
        </div>
    );
};
