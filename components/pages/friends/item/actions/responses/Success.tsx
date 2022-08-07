interface SuccessProps {
    message?: string;
}

export const Success = ({ message }: SuccessProps) => {
    return <span className="text-sm text-green-600 font-medium">{message ?? 'Action executed successfully'}</span>;
};
