import * as React from 'react';

import Link from 'next/link';


interface HeaderProps {
    name: string
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
    return (
        <div className="flex justify-between">
            <h5 className="text-3xl text-light-100 font-bold mb-4">{name}</h5>

            <div className="flex items-center gap-3">
                <Link href="/friends/suggests">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">Suggests</a>
                </Link>

                <Link href="/friends/invites">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">Invites</a>
                </Link>

                <Link href="/friends">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">All</a>
                </Link>
            </div>
        </div>
    );
}