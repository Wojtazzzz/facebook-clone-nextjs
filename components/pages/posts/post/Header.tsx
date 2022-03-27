import * as React from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@components/Avatar';

import type { UserType } from '@ctypes/features/UserType';

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

			<button
				className="w-8 h-8 flex justify-center items-center hover:bg-dark-100 rounded-full transition-colors cursor-pointer"
				onClick={() => alert('Coming soon!')}
			>
				<FontAwesomeIcon className="text-lg text-light-100" icon={faEllipsis} />
			</button>
		</div>
	);
};
