import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { Hit } from '@components/nav/search/hits/Hit';
import type { IUserHit } from '@utils/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoResults } from './NoResults';

interface HitsProps {
    data: IUserHit[] | undefined;
    hasNextPage: boolean | undefined;
    isLoading: boolean;
    fetchNextPage: () => void;
}

export const Hits = ({ data, isLoading, hasNextPage, fetchNextPage }: HitsProps) => {
    if (!data) return null;

    if (isLoading) return <SpinnerLoader testId="hits-fetching_loader" spinnerStyles="w-5" />;

    const HitsComponents = data.map((hit) => <Hit key={hit.id} {...hit} />);

    return (
        <div
            id="hits-list"
            data-testid="search-hits"
            className="w-full max-h-[450px] absolute top-full left-0 overflow-auto bg-dark-200 overflow-y-auto rounded-md shadow-md scrollbar-thin scrollbar-thumb-dark-100 p-2"
        >
            {!!data.length ? (
                <InfiniteScroll
                    dataLength={HitsComponents.length}
                    hasMore={!!hasNextPage}
                    loader={<SpinnerLoader testId="hits-fetching_loader" spinnerStyles="w-5" />}
                    className="w-full flex flex-col gap-2"
                    next={fetchNextPage}
                    scrollableTarget="hits-list"
                >
                    {HitsComponents}
                </InfiniteScroll>
            ) : (
                <NoResults />
            )}
        </div>
    );
};
