import { getErrorMessage } from '@utils/getErrorMessage/getErrorMessage';

interface ResponseErrorProps {
    error: unknown;
}

export const ResponseError = ({ error }: ResponseErrorProps) => {
    if (!error) return null;

    const message = getErrorMessage(error);

    return <span className="text-red-400 font-medium">{message}</span>;
};
