import * as React from 'react';

import Image from 'next/image';

import type { FriendType } from '@ctypes/features/FriendType';


interface ContactItemProps extends FriendType { }

export const ContactItem: React.FC<ContactItemProps> = ({ first_name, last_name, image }) => {
    return (
        <div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
            <div className="w-[36px] h-[36px] relative">
                <Image
                    className="rounded-full"
                    layout="fill"
                    src={image}
                    alt=""
                />
            </div>

            <span className="text-light-200 font-medium leading-5 m-0">{first_name} {last_name}</span>
        </div>
    );
}