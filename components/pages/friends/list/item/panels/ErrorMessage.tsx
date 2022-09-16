interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <span className="text-xs sm:text-sm text-red-400 font-medium">{message}</span>;
};
