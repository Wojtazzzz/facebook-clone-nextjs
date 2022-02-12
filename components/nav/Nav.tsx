import * as React from 'react';

import { Logo } from '@components/nav/Logo';


export const Nav: React.FC = () => {
    return (
        <nav className="w-full h-14 fixed top-0 left-0 bg-dark-200 shadow-sm py-2 px-4">
            <div className="">
                <Logo />
            </div>

            <div className=""></div>

            <div className=""></div>
        </nav>
    );
}