import { ValidationError } from '@components/inc/ValidationError';

import Axios from 'axios';
import { useEffect, useState } from 'react';

interface ErrorsProps {
    error?: unknown;
}

export const Errors = ({ error }: ErrorsProps) => {
    const [errorToDisplay, setErrorToDisplay] = useState('');

    useEffect(() => {
        if (error) {
            Axios.isAxiosError(error)
                ? setErrorToDisplay(error.response?.data.message ?? error.message)
                : setErrorToDisplay('Something went wrong, try again later');
        }
    }, [error]);

    return (
        <div className="w-full pl-2">
            {error ? (
                <span className="text-xs text-red-400 font-medium">{errorToDisplay}</span>
            ) : (
                <>
                    <ValidationError size="xs" fieldName="content" />
                    <ValidationError size="xs" fieldName="resource_id" />
                </>
            )}
        </div>
    );
};
