import * as React from 'react';

import { Logo } from '@components/nav/Logo';
import { Search } from '@components/nav/Search';
import { NavBar } from '@components/nav/navbar/NavBar';
import { Additions } from '@components/nav/additions/Additions';


export const Nav: React.FC = () => {
    return (
        <nav className="w-full h-14 flex justify-center fixed top-0 left-0 bg-dark-200 shadow-sm px-4">
            <div className="w-1/3 flex items-center gap-2 my-1">
                <Logo />

                <Search />
            </div>

            <div className="w-1/3">
                <NavBar />
            </div>

            <div className="w-1/3 my-1">
                <Additions />
            </div>
        </nav>
    );
}