import * as React from 'react';

import { faHome, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from '@components/nav/navbar/NavItem';


export const NavBar: React.FC = () => {
    return (
        <div className="h-full flex justify-center gap-2">
            <NavItem
                name="Home"
                path="/"
                icon={faHome}
                dataId="navigation-redirect-home"
            />

            <NavItem
                name="Marketplace"
                path="/marketplace"
                icon={faShop}
                dataId="navigation-redirect-marketplace"
            />

            <NavItem
                name="User profile"
                path="/profile"
                icon={faUser}
                dataId="navigation-redirect-profile"
            />
        </div>
    );
}