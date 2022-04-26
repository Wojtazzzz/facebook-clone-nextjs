import Link from 'next/link';
import { FacebookLogo } from '@components/inc/FacebookLogo';

export const Logo = () => {
    return (
        <div className="w-full mt-6 mb-12">
            <Link href="/">
                <a className="flex justify-center items-center gap-3">
                    <FacebookLogo />

                    <h1 className="text-2xl text-light-50 font-bold">Facebook</h1>
                </a>
            </Link>
        </div>
    );
};
