interface SuccessMessageProps {
    message?: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
    return <span className="text-sm text-green-600 font-medium">{message ?? 'Action executed successfully'}</span>;
};
