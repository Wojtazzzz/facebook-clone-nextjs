import { useGetFriendsByCount } from '@hooks/useGetFriendsByCount';
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
        if (i >= 5) return;
        return <Friend key={id} id={id} name={name} profileImage={profile_image} />;
    });

    return (
        <>
            <span className="xl:text-lg text-light-100 font-medium -my-1.5">
                {data.count} {data.count === 1 ? 'friend' : 'friends'}
            </span>

            <ul data-testid="profile-friendsList" className="flex">
                {FriendsComponents}
            </ul>
        </>
    );
};
