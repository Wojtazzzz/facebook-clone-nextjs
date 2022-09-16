/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export const Nav = () => {
    return (
        <nav data-testid="friends-nav" className="flex items-center gap-3">
            <Link href="/friends">
                <a className="text-xs sm:text-sm text-light-100 hover:text-light-200 transition-colors">Friends</a>
            </Link>

            <Link href="/friends/suggests">
                <a className="text-xs sm:text-sm text-light-100 hover:text-light-200 transition-colors">Suggests</a>
            </Link>

            <Link href="/friends/invites">
                <a className="text-xs sm:text-sm text-light-100 hover:text-light-200 transition-colors">Invites</a>
            </Link>
        </nav>
    );
};
