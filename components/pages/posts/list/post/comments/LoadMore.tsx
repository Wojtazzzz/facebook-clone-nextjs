import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { IComment, IPaginatedResponse } from '@utils/types';
import { Loader } from './list/Loader';

interface LoadMoreProps {
    isEmpty: boolean;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<IPaginatedResponse<IComment>, unknown>>;
}

export const LoadMore = ({ isEmpty, hasNextPage, isFetchingNextPage, fetchNextPage }: LoadMoreProps) => {
    if (!hasNextPage || isEmpty) return null;
    if (isFetchingNextPage) return <Loader testId="postsCommentsList-fetching_loader" />;

    const handleFetchNextPage = () => fetchNextPage();

    return (
        <button
            title="Load more comments"
            aria-label="Load more comments"
            className="text-sm text-light-100 font-bold hover:underline py-1 px-2"
            onClick={handleFetchNextPage}
        >
            View more comments
        </button>
    );
};
