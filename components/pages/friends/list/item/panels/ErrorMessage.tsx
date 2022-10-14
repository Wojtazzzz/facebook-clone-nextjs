interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <span className="text-xs sm:text-sm md:text-base text-red-400 font-medium">{message}</span>;
};
