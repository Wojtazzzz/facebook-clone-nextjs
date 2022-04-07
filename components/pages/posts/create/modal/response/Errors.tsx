import { ApiError } from '@components/ApiError';
import { ValidationErrorMessage } from '@components/ValidationErrorMessage';

import type { UseAxiosState } from '@ctypes/UseAxiosState';

interface ErrorsProps {
    state: UseAxiosState;
}

export const Errors = ({ state }: ErrorsProps) => {
    if (state.status === 'ERROR') {
        const contentTooLarge = state.error.message.includes('413');

        return contentTooLarge ? (
            <span className="text-sm text-red-400 font-medium">Your content is too large</span>
        ) : (
            <ApiError isSmall />
        );
    }

    return (
        <div>
            <ValidationErrorMessage fieldName="content" />
            <ValidationErrorMessage fieldName="images" />
        </div>
    );
};
