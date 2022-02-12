import * as React from 'react';

import Link from 'next/link';
import { SmallLogo } from '@components/SmallLogo';


export const Logo: React.FC = () => {
    return (
        <div className="w-full mt-6 mb-12">
            <Link href="/">
                <a className="flex justify-center items-center gap-3">
                    <SmallLogo />

                    <h1 className="text-2xl text-light-50 font-bold">Facebook</h1>
                </a>
            </Link>
        </div>
    );
}