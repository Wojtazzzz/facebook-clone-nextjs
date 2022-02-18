import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';


export const SingleLoading: React.FC = () => {
    return (
        <div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
            <SkeletonLoading styles="w-[36px] h-[36px]" isCircle />
            <SkeletonLoading styles={`w-[120px] h-[20px]`} />
        </div>
    );
}