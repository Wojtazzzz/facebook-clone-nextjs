import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Posts } from '@components/pages/index/Posts';

export default function Home() {
	return (
		<UserLayout>
			<Posts />
		</UserLayout>
	);
}
