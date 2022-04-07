import { memo } from 'react';

import Link from 'next/link';
import { Avatar } from '@components/Avatar';

import type { ReactNode } from 'react';
import type { UserType } from '@ctypes/features/UserType';

interface SlotProps extends UserType {
    children: ReactNode;
}

export const Slot = memo<SlotProps>(({ id, name, profile_image, children }) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Avatar size={85} src={profile_image} alt={name} />

                <span className="md:text-xl text-light-200 font-medium">{name}</span>

                <div className="ml-auto">{children}</div>
            </a>
        </Link>
    );
});

Slot.displayName = 'Slot';
