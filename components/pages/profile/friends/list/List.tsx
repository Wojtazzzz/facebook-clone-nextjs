import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Friend } from './friend/Friend';
import { Loader } from './Loader';
import { useGetFriends } from './useGetFriends';

interface ListProps {
    userId: number;
    query: string;
}

export const List = ({ userId, query }: ListProps) => {
    const { data, isLoading, isEmpty, isError, hasNextPage, fetchNextPage } = useGetFriends(userId, query);

    if (isLoading) return <Loader />;
    if (isError) return <ApiError size="xl" />;
    if (isEmpty) return <EmptyList title="No friends to display" size="lg" />;

    const FriendsComponents = data.map((friend) => <Friend key={friend.id} {...friend} />);

    return (
        <InfiniteScroll
            dataLength={FriendsComponents.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loader />}
            className="w-full flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start"
        >
            {FriendsComponents}
        </InfiniteScroll>
    );
};
