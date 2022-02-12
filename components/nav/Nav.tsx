import * as React from 'react';

import { Logo } from '@components/nav/Logo';
import { Search } from '@components/nav/Search';
import { NavBar } from '@components/nav/navbar/NavBar';
import { NavBar as MobileNavBar } from '@components/nav/mobile/NavBar';
import { Additions } from '@components/nav/additions/Additions';


export const Nav: React.FC = () => {
    return (
        <nav className="w-full h-14 flex justify-between md:justify-center fixed top-0 left-0 bg-dark-200 shadow-sm px-4">
            <div className="w-1/3 flex items-center gap-2 my-1">
                <Logo />

                <div className="hidden md:block">
                    <Search />
                </div>
            </div>

            <div className="w-1/3 hidden md:block">
                <NavBar />
            </div>

            <div className="w-1/3 my-1">
                <Additions />
            </div>

            <MobileNavBar />
        </nav>
    );
}