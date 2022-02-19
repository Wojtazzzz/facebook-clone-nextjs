import * as React from 'react';

import { Button } from '@components/Button';


export const FriendActions: React.FC = () => {
    return (
        <Button
            title="Send message"
            styles="w-[150px]"
            callback={() => console.log('Send message...')}
        />
    );
}