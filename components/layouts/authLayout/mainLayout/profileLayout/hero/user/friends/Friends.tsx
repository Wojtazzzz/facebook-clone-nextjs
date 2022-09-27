/* eslint-disable jsx-a11y/anchor-is-valid */
import { useGetFriendsByCount } from '@hooks/useGetFriendsByCount';
import Link from 'next/link';
import { ApiError } from './ApiError';
import { Friend } from './Friend';
import { Loader } from './Loader';

interface FriendsProps {
    userId: number;
}

export const Friends = ({ userId }: FriendsProps) => {
    const { data, isLoading, isError } = useGetFriendsByCount(userId, 8);

    if (isLoading) return <Loader />;
    if (isError) return <ApiError />;

    const FriendsComponents = data.friends.map(({ id, name, profile_image }, i) => {
        if (i >= 8) return;
        return <Friend key={id} id={id} name={name} profileImage={profile_image} />;
    });

    return (
        <>
            <Link href={`/profile/${userId}/friends`}>
                <a className="w-fit xl:text-lg text-light-100 font-medium hover:underline -mt-1.5 mb-1">
                    {data.count} {data.count === 1 ? 'friend' : 'friends'}
                </a>
            </Link>

            <ul data-testid="profile-friendsList" className="flex">
                {FriendsComponents}
            </ul>
        </>
    );
};
