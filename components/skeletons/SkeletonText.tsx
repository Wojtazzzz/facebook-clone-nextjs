import * as React from 'react';


interface SkeletonTextProps {
    width: string,
    height: string
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ width, height }) => {
    return (
        <p className={`flex w-${width} h-${height} bg-light-100 rounded-md`}></p>
    );
}