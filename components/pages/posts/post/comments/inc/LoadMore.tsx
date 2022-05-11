interface LoadMoreProps {
    isReachedEnd: boolean;
    callback: () => void;
}

export const LoadMore = ({ isReachedEnd, callback }: LoadMoreProps) => {
    if (isReachedEnd) {
        return <span className="text-sm text-light-100 font-bold hover:underline py-1 px-2">Write a comment...</span>;
    }

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
