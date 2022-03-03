import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Profile as ProfileComponent } from '@components/pages/profile/Profile';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { UserType } from '@ctypes/features/UserType';

interface ProfileProps {
	user: UserType;
}

export default function Profile({ user }: ProfileProps) {
	return (
		<UserLayout>
			<ProfileComponent user={user} />
		</UserLayout>
	);
}

interface IParams extends ParsedUrlQuery {
	id: string;
}

export const getStaticProps: GetStaticProps = async context => {
	const { id } = context.params as IParams;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`);
	const data = await response.json();

	return {
		props: {
			user: data.user,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`);
	const data = await response.json();

	const paths = data.users.map(({ id }: UserType) => ({
		params: { id: id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
};
