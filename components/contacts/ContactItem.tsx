import * as React from 'react';

import Image from 'next/image';

import type { FriendType } from '@ctypes/features/FriendType';


interface ContactItemProps extends FriendType { }

export const ContactItem: React.FC<ContactItemProps> = ({ first_name, last_name, profile_image }) => {
    return (
        <div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
            <Image
                width="36"
                height="36"
                src={profile_image}
                alt=""
                className="rounded-full"
            />

            <span className="text-light-200 font-medium leading-5 m-0">{first_name} {last_name}</span>
        </div>
    );
}