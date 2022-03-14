import * as React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAppSelector } from '@hooks/redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandLizard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { SideItem } from '@components/sidebar/SideItem';
import { SideItemLoader } from '@components/sidebar/SideItemLoader';
import { Avatar } from '@components/Avatar';

export const Sidebar = () => {
	const { user } = useAuth();
	const { isActive } = useAppSelector(store => store.sidebar);

	return (
		<aside
			className={`w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col fixed lg:relative top-0 left-0 bg-dark-300 ${
				isActive ? '' : '-translate-x-[300px] lg:translate-x-[0px]'
			} transition-transform z-30 px-2 py-5`}
		>
			{user ? (
				<SideItem
					title={user.name}
					link={`/profile/${user.id}`}
					icon={<Avatar size={36} src={user.profile_image} alt={user.name} />}
				/>
			) : (
				<SideItemLoader />
			)}

			<SideItem title="Friends" link="/friends" icon={<FontAwesomeIcon icon={faUsers} />} />
			<SideItem title="Pokes" link="/friends/pokes" icon={<FontAwesomeIcon icon={faHandLizard} />} />
			<SideItem
				title="GitHub"
				link="https://github.com/CubeStorm/"
				icon={<FontAwesomeIcon icon={faGithub} />}
				target="_blank"
			/>
		</aside>
	);
};
