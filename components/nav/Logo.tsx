import Link from 'next/link';
import { FacebookLogo } from '@components/inc/FacebookLogo';

export const Logo = () => {
    return (
        <Link href="/">
            <a data-testid="nav-logo" className="relative z-10">
                <FacebookLogo />
            </a>
        </Link>
    );
};
