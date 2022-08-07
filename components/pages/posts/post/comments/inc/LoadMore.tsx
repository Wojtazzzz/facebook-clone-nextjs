import { Loader } from '@components/pages/posts/post/comments/inc/Loader';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import type { IComment, IPaginatedResponse } from '@utils/types';

interface LoadMoreProps {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<IPaginatedResponse<IComment>, unknown>>;
}

export const LoadMore = ({ hasNextPage, isFetchingNextPage, fetchNextPage }: LoadMoreProps) => {
    if (isFetchingNextPage) return <Loader testId="postsCommentsList-fetching_loader" />;

    if (!hasNextPage) {
        return <span className="text-sm text-light-100 font-bold hover:underline py-1 px-2">Write a comment...</span>;
    }

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
