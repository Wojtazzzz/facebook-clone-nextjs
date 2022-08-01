interface CommentsProps {
    count: number;
    toggleCommentsActive: () => void;
}

export const Comments = ({ count, toggleCommentsActive }: CommentsProps) => {
    return (
        <button
            aria-label="Toggle comments section"
            className="text-sm cursor-pointer hover:underline ml-auto"
            onClick={toggleCommentsActive}
        >
            {count} comments
        </button>
    );
};
