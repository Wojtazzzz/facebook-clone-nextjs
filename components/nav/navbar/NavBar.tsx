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
            />

            <NavItem
                name="Marketplace"
                path="/marketplace"
                icon={faShop}
            />

            <NavItem
                name="User profile"
                path="/profile"
                icon={faUser}
            />
        </div>
    );
}