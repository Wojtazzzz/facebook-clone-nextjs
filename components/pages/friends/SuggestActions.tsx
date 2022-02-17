import * as React from 'react';

import { Button } from '@components/Button';


interface SuggestActionsProps {

}

export const SuggestActions: React.FC<SuggestActionsProps> = () => {
    return (
        <Button
            title="Invite"
            styles="w-[150px] ml-auto"
            callback={() => console.log('Accept action...')}
        />
    );
}