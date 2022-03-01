import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useFriends } from '@hooks/useFriends';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@components/Button';

import { ListType } from '@enums/ListType';

import type { UserType } from '@ctypes/features/UserType';

interface HeaderProps {
	user: UserType;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
	const { id, first_name, last_name, profile_image, background_image } = user;
	const { user: loggedUser } = useAuth();
	const { friends } = useFriends(ListType.FRIENDS, id);
	const [isUserLogged, setIsUserLogged] = useState(false);

	useEffect(() => {
		if (loggedUser) setIsUserLogged(loggedUser.id == id);
	}, [loggedUser, id]);

	const FriendsHeadsComponents = friends?.map(({ id, first_name, last_name, profile_image }, i) => {
		if (i >= 5) return;

		return (
			<Link href={`/profile/${id}`} key={id}>
				<a className="-mx-0.5">
					<Image
						key={id}
						width="32"
						height="32"
						src={profile_image}
						alt={`${first_name} ${last_name}`}
						title={`${first_name} ${last_name}`}
						className="rounded-full"
					/>
				</a>
			</Link>
		);
	});

	return (
		<div className="w-full border-b-2 border-dark-100">
			<div className="w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] relative">
				<Image
					layout="fill"
					src={background_image}
					alt={`${first_name} background`}
					priority
					className="rounded-b-lg"
				/>
			</div>

			<div className="w-full flex flex-col md:flex-row justfy-between -translate-y-10 px-3 xs:px-5 sm:px-8 md:px-10 lg:px-12">
				<div className="w-full flex items-center gap-5">
					<div className="w-[120px] sm:w-[140px] lg:w-[168px] h-[120px] sm:h-[140px] lg:h-[168px] relative">
						<Image
							layout="fill"
							src={profile_image}
							alt={`${first_name} profile image`}
							className="rounded-full border-4 border-dark-200"
						/>
					</div>

					<div className="flex flex-col gap-1.5 mt-12">
						<span className="text-2xl xl:text-3xl text-light-200 font-bold">
							{first_name} {last_name}
						</span>

						<span className="xl:text-lg text-light-100 font-medium -my-1.5">{friends.length} Friends</span>

						<div className="flex">{FriendsHeadsComponents}</div>
					</div>
				</div>

				<div className="w-full flex justify-end items-end gap-4 mb-6 mr-6">
					{isUserLogged ? (
						<Button title="Edit profile" isDisabled styles="w-[130px] xl:w-[155px]" />
					) : (
						<>
							<Button title="Send message" styles="w-[130px] xl:w-[155px]" />

							<Button title="Poke" styles="w-[130px] xl:w-[155px]" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
