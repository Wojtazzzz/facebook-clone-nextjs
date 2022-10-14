interface SuccessMessageProps {
    message: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
    return <span className="text-xs sm:text-sm md:text-base text-green-400 font-medium">{message}</span>;
};
