import * as React from 'react';


interface SkeletonAvatarProps {
    size: string
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size }) => {
    return (
        <div className={`w-${size} h-${size} bg-light-100 rounded-full`}></div>
    );
}