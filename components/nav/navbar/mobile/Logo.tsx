import Link from 'next/link';
import { Logo as AppLogo } from '@components/inc/Logo';

export const Logo = () => {
    return (
        <div className="w-full mt-6 mb-12">
            <Link href="/">
                <a className="flex justify-center items-center gap-3">
                    <AppLogo size={38} />

                    <h1 className="text-2xl text-light-50">Surface App</h1>
                </a>
            </Link>
        </div>
    );
};
