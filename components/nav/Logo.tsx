/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Logo as FacebookLogo } from '@components/inc/Logo';

export const Logo = () => {
    return (
        <Link href="/">
            <a data-testid="nav-logo" className="relative z-10">
                <FacebookLogo />
            </a>
        </Link>
    );
};
