import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Posts } from '@components/pages/posts/Posts';

export default function Home() {
	return (
		<UserLayout>
			<Posts />
		</UserLayout>
	);
}
