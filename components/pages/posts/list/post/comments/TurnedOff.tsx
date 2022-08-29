interface TurnedOffProps {
    authorName: string;
}

export const TurnedOff = ({ authorName }: TurnedOffProps) => {
    return (
        <div className="w-full text-center bg-dark-100 rounded-b-lg p-2">
            <span className="text-xs font-medium text-light-100 tracking-wide">
                {authorName} turned off commenting for this post.
            </span>
        </div>
    );
};
