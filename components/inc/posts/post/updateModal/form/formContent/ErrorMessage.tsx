import { ValidationError } from '@components/inc/ValidationError';
import { getErrorMessage } from '@utils/getErrorMessage/getErrorMessage';

interface ErrorMessageProps {
    error: unknown;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if (error) {
        const message = getErrorMessage(error);

        return <div className="text-sm text-red-400 font-medium p-2">{message}</div>;
    }

    return (
        <section data-testid="post-validation" className="w-full mb-3 p-3">
            <ValidationError fieldName="content" />
            <ValidationError fieldName="images" />
        </section>
    );
};
