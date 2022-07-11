import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { UserHit } from '@ctypes/UserHitType';

interface HitProps extends UserHit {}

export const Hit = ({ id, first_name, last_name, profile_image }: HitProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="w-full flex gap-3 hover:bg-dark-100 transition-colors rounded-md p-2">
                <Avatar src={profile_image} size={64} alt="" />

                <span className="text-light-200 font-medium my-auto">
                    {first_name} {last_name}
                </span>
            </a>
        </Link>
    );
};
