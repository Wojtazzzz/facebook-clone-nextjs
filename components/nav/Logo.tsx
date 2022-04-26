import Link from 'next/link';
import { FacebookLogo } from '@components/inc/FacebookLogo';

export const Logo = () => {
    return (
        <Link href="/">
            <a className="flex relative z-10">
                <FacebookLogo />
            </a>
        </Link>
    );
};
