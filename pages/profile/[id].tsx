import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/profile/Header';

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { UserType } from '@ctypes/features/UserType';

interface ProfileProps {
	user: UserType;
}

const Profile: NextPage<ProfileProps> = ({ user }) => {
	return (
		<UserLayout>
			<div className="w-full">
				<Header user={user} />
			</div>
		</UserLayout>
	);
};

export default Profile;

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
