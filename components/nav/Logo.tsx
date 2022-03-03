import * as React from 'react';

import Link from 'next/link';
import { SmallLogo } from '@components/SmallLogo';

export const Logo = () => {
	return (
		<Link href="/">
			<a className="flex relative z-10">
				<SmallLogo />
			</a>
		</Link>
	);
};
