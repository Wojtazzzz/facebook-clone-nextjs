import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { ReactNode } from 'react';
import type { IUser } from '@utils/types';

interface UserProps extends IUser {
    children: ReactNode;
}

export const User = ({ id, name, profile_image, children }: UserProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Avatar size={85} src={profile_image} alt={name} />

                <span className="md:text-xl text-light-200 font-medium">{name}</span>

                <div className="ml-auto">{children}</div>
            </a>
        </Link>
    );
};
