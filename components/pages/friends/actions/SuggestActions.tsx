import * as React from 'react';

import { Button } from '@components/Button';


export const SuggestActions: React.FC = () => {
    return (
        <Button
            title="Invite"
            styles="w-[150px] ml-auto"
            callback={() => console.log('Accept action...')}
        />
    );
}