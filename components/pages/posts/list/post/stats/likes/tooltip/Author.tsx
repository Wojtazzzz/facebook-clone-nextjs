interface AuthorProps {
    name: string;
}

export const Author = ({ name }: AuthorProps) => {
    return (
        <span aria-label="Like added by" className="text-xs text-light-100">
            {name}
        </span>
    );
};
