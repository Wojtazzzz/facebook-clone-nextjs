interface AuthorProps {
    name: string;
}

export const Author = ({ name }: AuthorProps) => {
    return <span className="text-xs text-light-100">{name}</span>;
};
