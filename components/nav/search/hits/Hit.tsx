/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';
import type { IUserHit } from '@utils/types';

interface HitProps extends IUserHit {}

export const Hit = ({ id, name, profile_image }: HitProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="w-full flex gap-3 hover:bg-dark-100 transition-colors rounded-md p-2">
                <Avatar src={profile_image} size={36} alt="" />

                <span className="text-light-200 font-medium my-auto">{name}</span>
            </a>
        </Link>
    );
};
