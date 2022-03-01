import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Posts } from '@components/pages/index/Posts';

import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<UserLayout>
			<Posts />
		</UserLayout>
	);
};

export default Home;
