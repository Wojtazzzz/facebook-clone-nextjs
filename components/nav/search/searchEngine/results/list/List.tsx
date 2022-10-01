import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoResults } from './NoResults';
import { SingleResult } from './SingleResult';
import { ApiError } from './ApiError';
import { useSearchUsers } from './useSearchUsers';

interface ListProps {
    query: string;
}

export const List = ({ query }: ListProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useSearchUsers(query);

    if (isLoading) return <SpinnerLoader testId="navSearch-fetching_loader" spinnerStyles="w-5 my-3" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <NoResults />;

    const HitsComponents = data.map((hit) => <SingleResult key={hit.id} {...hit} />);

    return (
        <InfiniteScroll
            dataLength={HitsComponents.length}
            hasMore={Boolean(hasNextPage)}
            loader={<SpinnerLoader testId="navSearch-fetching_loader" spinnerStyles="w-5" />}
            className="w-full flex flex-col gap-2"
            next={fetchNextPage}
            scrollableTarget="navSearch-results"
        >
            {HitsComponents}
        </InfiniteScroll>
    );
};
