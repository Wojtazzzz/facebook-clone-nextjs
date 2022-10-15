import Link from 'next/link';
import { Logo as AppLogo } from '@components/inc/Logo';

export const Logo = () => {
    return (
        <Link href="/">
            <a data-testid="nav-logo" className="relative z-10 w-[40px] h-[40px]">
                <AppLogo size={40} />
            </a>
        </Link>
    );
};
