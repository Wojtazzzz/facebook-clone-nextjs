import * as React from 'react';

import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Item } from '@components/nav/additions/Item';


export const Additions: React.FC = () => {
    return (
        <div className="h-full flex justify-end items-center gap-2">
            <Item
                name="Messenger"
                icon={faFacebookMessenger}
                action={() => console.log('Action..')}
            />

            <Item
                name="Notifications"
                icon={faBell}
                action={() => console.log('Action..')}
            />

            <Item
                name="Settings"
                icon={faGear}
                action={() => console.log('Action..')}
            />
        </div>
    );
}