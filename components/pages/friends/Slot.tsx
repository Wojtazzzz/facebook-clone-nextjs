import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { UserType } from '@ctypes/features/UserType';


interface SlotProps extends UserType { }

export const Slot: React.FC<SlotProps> = ({ id, first_name, last_name, profile_image, children }) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Image
                    width="85"
                    height="85"
                    src={profile_image}
                    alt={`${first_name} ${last_name} profile image`}
                    className="rounded-full"
                />

                <span className="md:text-xl text-light-200 font-medium">{first_name} {last_name}</span>

                {children}
            </a>
        </Link>
    );
}