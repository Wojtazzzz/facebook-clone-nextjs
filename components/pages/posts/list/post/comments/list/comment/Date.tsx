interface DateProps {
    createdAt: string;
    isEdited: boolean;
}

export const Date = ({ createdAt, isEdited }: DateProps) => {
    return (
        <span className="text-xs text-light-100 font-bold">
            {createdAt} {isEdited && '(Edited)'}
        </span>
    );
};
