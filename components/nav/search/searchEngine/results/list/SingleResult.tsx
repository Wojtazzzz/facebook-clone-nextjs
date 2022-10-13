import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';
import type { IFriend } from '@utils/types';

interface SingleResultProps extends IFriend {}

export const SingleResult = ({ id, name, profile_image }: SingleResultProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="w-full flex gap-3 hover:bg-dark-100 transition-colors rounded-md p-2">
                <Avatar src={profile_image} alt="" styles="w-[36px] h-[36px]" />

                <span className="text-light-200 font-medium my-auto">{name}</span>
            </a>
        </Link>
    );
};
