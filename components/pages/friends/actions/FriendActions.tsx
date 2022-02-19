import * as React from 'react';
import { useState } from 'react';

import { Button } from '@components/Button';

import axios from '@lib/axios';


interface FriendActionsProps {
    id: number
}

export const FriendActions: React.FC<FriendActionsProps> = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        setIsLoading(true);

        axios.post('/api/destroy', { user_id: id })
            .then(() => setIsSuccess(true))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    if (isSuccess) return <span className="text-sm text-green-600 font-medium">Friend removed</span>;
    if (isError) return <span className="text-sm text-red-400 font-medium">Something went wrong</span>;

    return (
        <div className="flex gap-3">
            <Button
                title="Send message"
                styles="w-[140px]"
                isDisabled={isLoading}
                callback={() => console.log('Send message...')}
            />

            <Button
                title="Remove"
                styles="w-[100px]"
                isDisabled={isLoading}
                callback={handleRemove}
            />
        </div>
    );
}