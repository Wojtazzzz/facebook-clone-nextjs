import * as React from 'react';

import SkeletonLoader from 'tiny-skeleton-loader-react';


interface ContactItemProps {
    first_name: string
    last_name: string
}

export const ContactItem: React.FC<ContactItemProps> = ({ first_name, last_name }) => {
    return (
        <div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
            <div className="w-[36px] h-[36px]">
                <SkeletonLoader background="#242526" style={{ width: '100%', height: '100%' }} circle={true} />
            </div>

            <span className="text-light-200 font-medium leading-5 m-0">{first_name} {last_name}</span>
        </div>
    );
}