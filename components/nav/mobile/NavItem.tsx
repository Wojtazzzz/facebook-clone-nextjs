import * as React from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface NavItemProps {
    name: string,
    path: string,
    icon: IconDefinition
}

export const NavItem: React.FC<NavItemProps> = ({ name, path, icon }) => {
    return (
        <Link href={path}>
            <a
                title={name}
                aria-label={name}
                className="w-full h-[50px] flex items-center gap-3 border-b-dark-100 border-b-2 px-4"
            >
                <div className="w-[26px]">
                    <FontAwesomeIcon
                        className="text-xl text-light-100"
                        icon={icon}
                    />
                </div>

                <span className="text-lg text-light-100 font-bold">{name}</span>
            </a>
        </Link>
    );
}