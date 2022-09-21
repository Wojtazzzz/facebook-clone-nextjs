import { Loader } from './Loader';

interface LoadMoreProps {
    isEmpty: boolean;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const LoadMore = ({ isEmpty, hasNextPage, isFetchingNextPage, fetchNextPage }: LoadMoreProps) => {
    if (!hasNextPage || isEmpty) return null;
    if (isFetchingNextPage) return <Loader />;

    return (
        <button
            title="Load more comments"
            aria-label="Load more comments"
            className="text-sm text-light-100 font-bold hover:underline py-1 px-2"
            onClick={fetchNextPage}
        >
            View more comments
        </button>
    );
};
