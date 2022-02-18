import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';


export const SingleLoading: React.FC = () => {
    return (
        <div className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
            <SkeletonLoading styles="w-[80px] h-[80px]" isCircle />
            <SkeletonLoading styles="w-[150px] md:w-[180px] lg:w-[240px] h-[30px]" />
            <SkeletonLoading styles="hidden md:block w-[150px] h-[50px] ml-auto" />
        </div>
    );
}