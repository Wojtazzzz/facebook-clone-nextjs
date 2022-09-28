import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useGetFriendsByCount } from '@hooks/useGetFriendsByCount';
import { Friend } from './Friend';
import { Loader } from './Loader';

interface ListProps {
    userId: number;
}

export const List = ({ userId }: ListProps) => {
    const { data, isError, isLoading } = useGetFriendsByCount(userId, 9);

    if (isLoading) return <Loader />;
    if (isError) return <ApiError />;
    if (data.count < 1) return <EmptyList title="No friends to display" />;

    const FriendsComponents = data.friends.map((friend) => <Friend key={friend.id} {...friend} />);

    return <ul className="flex flex-wrap">{FriendsComponents}</ul>;
};
