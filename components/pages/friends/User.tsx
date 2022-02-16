import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';


interface UserProps {
    path: string,
    name: string,
    profile_image: string
}

export const User: React.FC<UserProps> = ({ path, name, profile_image, children }) => {
    return (
        <Link href={path}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Image
                    width="85"
                    height="85"
                    src={profile_image}
                    alt={`${name} profile image`}
                    className="rounded-full"
                />

                <span className="md:text-xl text-light-200 font-medium">{name}</span>

                {children}
            </a>
        </Link>
    );
}