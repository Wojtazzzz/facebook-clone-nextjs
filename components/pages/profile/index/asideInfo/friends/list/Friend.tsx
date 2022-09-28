/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

interface FriendProps {
    id: number;
    name: string;
    profile_image: string;
}

export const Friend = ({ id, name, profile_image }: FriendProps) => {
    return (
        <li className="w-[33%] overflow-hidden">
            <div className="w-full px-1 py-2">
                <Link href={`/profile/${id}`}>
                    <a>
                        <div className="w-full aspect-square relative hover:brightness-110 transition-filter">
                            <Image layout="fill" src={profile_image} alt="" className="rounded-lg" />
                        </div>

                        <span className="text-[11px] font-semibold leading-[0.5] truncate text-light-50 mt-1">
                            {name}
                        </span>
                    </a>
                </Link>
            </div>
        </li>
    );
};
