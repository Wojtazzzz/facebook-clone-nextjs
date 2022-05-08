interface RequestErrorsProps {
    error: string;
}

export const RequestErrors = ({ error }: RequestErrorsProps) => {
    return (
        <div className="flex flex-col text-red-400">
            <span className="font-medium">{error}</span>
        </div>
    );
};
