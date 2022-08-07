interface ErrorMessageProps {
    isError: boolean;
    message?: string;
}

export const ErrorMessage = ({ isError, message }: ErrorMessageProps) => {
    if (!isError) {
        return null;
    }

    return (
        <div className="flex flex-col text-red-400">
            <span className="font-medium">{message ?? 'Something went wrong, please try again later'}</span>
        </div>
    );
};
