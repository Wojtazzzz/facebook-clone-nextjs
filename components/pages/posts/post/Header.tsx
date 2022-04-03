import * as React from 'react';import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@components/Avatar';

import type { UserType } from '@ctypes/features/UserType';
import { RoundedButton } from '@components/RoundedButton';

interface HeaderProps {
	author: UserType;
	created_at: string;
	updated_at: string;
}

export const Header = ({ author, created_at, updated_at }: HeaderProps) => {
	return (
		<div className="w-full flex justify-between p-4 pb-0">
			<div className="flex gap-3">
				<Link href={`/profile/${author.id}`}>
					<a className="text-sm text-light-50 font-medium">
						<Avatar size={40} src={author.profile_image} alt={`${author.name} profile image`} />
					</a>
				</Link>

				<div className="flex flex-col gap-px">
					<Link href={`/profile/${author.id}`}>
						<a className="text-sm text-light-50 font-medium">{author.name}</a>
					</Link>

					<span className="text-xs text-light-100">
						{updated_at} {created_at !== updated_at && '(Edited)'}
					</span>
				</div>
			</div>

			<RoundedButton
				name="Show post settings"
				icon={faEllipsis}
				size={8}
				bgColor="dark-200"
				onHover="bg-dark-100"
				callback={() => alert('Coming soon!')}
			/>
		</div>
	);
};
