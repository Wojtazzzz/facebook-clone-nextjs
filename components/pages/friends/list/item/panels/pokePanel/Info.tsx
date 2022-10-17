interface InfoProps {
    firstName: string;
    count: number;
    updatedAt: string;
}

export const Info = ({ firstName, count, updatedAt }: InfoProps) => {
    return (
        <div className="w-full flex flex-col items-center text-xs sm:text-sm text-center text-light-100">
            <small>
                {firstName} poked you {count} times in a row
            </small>

            <small>{updatedAt}</small>
        </div>
    );
};
