interface FailureProps {
    message: string;
}

export const Failure = ({ message }: FailureProps) => {
    return <span className="text-sm text-red-400 font-medium">{message}</span>;
};
