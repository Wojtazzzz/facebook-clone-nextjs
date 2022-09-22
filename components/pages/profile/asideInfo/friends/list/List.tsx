import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { Empty } from './Empty';
import { Friend } from './Friend';
import { Loader } from './Loader';
import { useGetFriends } from './useGetFriends';

interface ListProps {
    id: number;
}

export const List = ({ id }: ListProps) => {
    const { data, isError, isLoading } = useGetFriends(id);

    if (isLoading) return <Loader />;
    if (isError) return <ApiError />;
    if (data.length < 1) return <EmptyList title="No friends to display" />;

    const FriendsComponents = data?.map((friend) => <Friend key={friend.id} {...friend} />);

    return <ul className="flex flex-wrap gap-x-2 gap-y-4">{FriendsComponents}</ul>;
};
