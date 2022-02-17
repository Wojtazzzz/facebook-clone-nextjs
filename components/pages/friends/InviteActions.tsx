import * as React from 'react';

import { Button } from '@components/Button';


export const InviteActions: React.FC = () => {
    return (
        <div className="flex gap-3 ml-auto">
            <Button
                title="Reject"
                styles="w-[100px]"
                callback={() => console.log('Reject action...')}
            />

            <Button
                title="Accept"
                styles="w-[100px]"
                callback={() => console.log('Accept action...')}
            />
        </div>
    );
}