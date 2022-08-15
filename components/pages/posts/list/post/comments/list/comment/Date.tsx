interface DateProps {
    updatedAt: string;
    createdAt: string;
}

export const Date = ({ updatedAt, createdAt }: DateProps) => {
    return (
        <span className="text-xs text-light-100 font-bold">
            {updatedAt} {createdAt !== updatedAt && '(Edited)'}
        </span>
    );
};
