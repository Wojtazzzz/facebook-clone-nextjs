/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';
import { Loader } from '@components/menu/profileLink/Loader';
import { Avatar } from '@components/inc/Avatar';

export const ProfileLink = () => {
    const { user } = useAuth();

    if (!user) return <Loader />;

    const { id, name, profile_image } = user;

    return (
        <li role="menuitem">
            <Link href={`/profile/${id}`}>
                <a
                    rel="_self"
                    className="h-12 flex items-center gap-2 hover:bg-dark-100 transition-colors rounded-md p-1"
                >
                    <div className="w-12 flex justify-center items-center text-light-200 text-xl">
                        <Avatar src={profile_image} alt="" styles="w-[36px] h-[36px]" />
                    </div>

                    <div className="w-full text-light-200 font-medium">{name}</div>
                </a>
            </Link>
        </li>
    );
};
