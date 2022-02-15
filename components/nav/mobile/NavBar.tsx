import * as React from 'react';
import { useAppSelector } from '@hooks/redux';

import { faHome, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '@components/nav/mobile/Logo';
import { NavItem } from '@components/nav/mobile/NavItem';
import { Search } from '@components/nav/Search';


export const NavBar: React.FC = () => {
    const { isActive } = useAppSelector(store => store.nav);

    return (
        <div className={`w-[280px] h-screen bg-dark-200 fixed top-0 left-0 z-30 ${isActive ? 'translate-x-0' : '-translate-x-[280px]'} transition-transform shadow-md`}>
            <Logo />

            <div className="flex flex-col gap-6">
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

            <div className="w-full flex justify-center absolute bottom-[70px]">
                <Search />
            </div>
        </div>
    );
}