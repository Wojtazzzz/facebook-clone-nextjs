import * as React from 'react';

import { faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Item } from '@components/nav/additions/Item';
import { useAuth } from '@hooks/useAuth';


export const Additions: React.FC = () => {
    const { logout, isRequestLoading } = useAuth();

    const handleLogout = () => logout();

    return (
        <div className="h-full flex justify-end items-center gap-2">
            <Item
                name="Messenger"
                icon={faFacebookMessenger}
                dataId="navigation-addition-messenger"
                action={() => console.log('Action..')}
            />

            <Item
                name="Notifications"
                icon={faBell}
                dataId="navigation-addition-notifications"
                action={() => console.log('Action..')}
            />

            <div className={`${isRequestLoading ? 'opacity-60 hover:opacity-60' : ''}`}>
                <Item
                    name="Log out"
                    icon={faRightFromBracket}
                    dataId="navigation-addition-logout"
                    action={handleLogout}
                />
            </div>
        </div>
    );
}