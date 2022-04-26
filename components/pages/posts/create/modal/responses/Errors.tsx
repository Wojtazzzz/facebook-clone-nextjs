import { ApiError } from '@components/inc/ApiError';
import { ValidationError } from '@components/inc/ValidationError';

import type { UseAxiosState } from '@ctypes/UseAxiosState';
import type { CreatePostResponse } from '@ctypes/responses/CreatePostResponse';

interface ErrorsProps {
    state: UseAxiosState<CreatePostResponse>;
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
            <ValidationError fieldName="content" />
            <ValidationError fieldName="images" />
        </div>
    );
};
