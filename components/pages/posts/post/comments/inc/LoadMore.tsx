import { Loader } from '@components/pages/posts/post/comments/inc/Loader';

interface LoadMoreProps {
    isReachedEnd: boolean;
    isFetching: boolean;
    callback: () => void;
}

export const LoadMore = ({ isReachedEnd, isFetching, callback }: LoadMoreProps) => {
    if (isFetching) return <Loader testId="postsCommentsList-fetching_loader" />;

    if (isReachedEnd)
        return <span className="text-sm text-light-100 font-bold hover:underline py-1 px-2">Write a comment...</span>;

    return (
        <button
            title="Load more comments"
            aria-label="Load more comments"
            className="text-sm text-light-100 font-bold hover:underline py-1 px-2"
            onClick={callback}
        >
            View more comments
        </button>
    );
};
