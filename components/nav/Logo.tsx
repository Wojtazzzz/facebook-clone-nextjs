import * as React from 'react';

import Link from 'next/link';
import { SmallLogo } from '@components/SmallLogo';


export const Logo: React.FC = () => {
    return (
        <Link href="/">
            <a className="flex relative z-10" data-test-id="navigation-logo">
                <SmallLogo />
            </a>
        </Link>
    );
}