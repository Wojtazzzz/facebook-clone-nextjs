import Link from 'next/link';
import { Logo as FacebookLogo } from '@components/inc/Logo';

export const Logo = () => {
    return (
        <Link href="/">
            <a data-testid="nav-logo" className="relative z-10 w-[40px] h-[40px]">
                <FacebookLogo size={40} />
            </a>
        </Link>
    );
};
