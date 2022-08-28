import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { Hit } from '@components/nav/search/hits/Hit';
import type { IUserHit } from '@utils/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NoResults } from './NoResults';

interface HitsProps {
    data: IUserHit[] | undefined;
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
}

export const Hits = ({ data, hasNextPage, fetchNextPage }: HitsProps) => {
    if (!data) return null;

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
                    loader={<SpinnerLoader testid="hits-fetching_loader" spinnerStyles="w-5" />}
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
