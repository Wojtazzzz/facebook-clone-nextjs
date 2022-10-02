import { ValidationError } from '@components/inc/ValidationError';
import { getErrorMessage } from '@utils/getErrorMessage/getErrorMessage';
import type { IPostCreatePayload } from '@utils/types';
import { useFormikContext } from 'formik';

interface ErrorMessageProps {
    error: unknown;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
    const { errors } = useFormikContext<IPostCreatePayload>();

    if (error) {
        const message = getErrorMessage(error);

        return <div className="text-sm text-red-400 font-medium p-2">{message}</div>;
    }

    if (!errors.content && !errors.images) {
        return null;
    }

    return (
        <section data-testid="post-validation" role="alert" className="w-full p-3">
            <ValidationError fieldName="content" />
            <ValidationError fieldName="images" />
        </section>
    );
};
