import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { faHome, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from '@components/nav/navbar/NavItem';


export const NavBar: React.FC = () => {
    const { user } = useAuth();

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
                path={user ? `/profile/${user.id}` : '/profile/0'}
                icon={faUser}
            />
        </div>
    );
}