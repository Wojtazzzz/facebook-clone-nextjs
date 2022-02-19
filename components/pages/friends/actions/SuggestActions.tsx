import * as React from 'react';
import { useState } from 'react';

import { Button } from '@components/Button';

import axios from '@lib/axios';


interface SuggestActionsProps {
    id: string
}

export const SuggestActions: React.FC<SuggestActionsProps> = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInvite = (event: FocusEvent) => {
        event.preventDefault();
        setIsLoading(true);

        axios.post('/api/invite', { user_id: id })
            .then(() => setIsSuccess(true))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    if (isSuccess) return <span className="text-sm text-green-600 font-medium">Invitation sended</span>;
    if (isError) return <span className="text-sm text-red-400 font-medium">Something went wrong</span>;

    return (
        <Button
            title="Invite"
            styles="w-[150px]"
            isDisabled={isLoading}
            callback={event => handleInvite(event)}
        />
    );
}