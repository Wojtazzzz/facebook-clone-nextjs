interface LikeProps {
    name: string;
}

export const Like = ({ name }: LikeProps) => {
    return (
        <li aria-label="Like added by" className="text-xs text-light-100">
            {name}
        </li>
    );
};
