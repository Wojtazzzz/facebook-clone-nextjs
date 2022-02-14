import * as React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAppSelector } from '@hooks/redux';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandLizard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { SideItem } from '@components/sidebar/SideItem';
import { SideItemLoading } from '@components/sidebar/SideItemLoading';


export const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const { isActive } = useAppSelector(store => store.sidebar);

    return (
        <aside className={`w-[250px] lg:w-[300px] h-screen flex flex-col fixed lg:relative top-0 left-0 bg-dark-300 ${isActive ? '' : '-translate-x-[300px] lg:translate-x-[0px]'} transition-transform z-30 px-2 py-5`}>
            {user
                ? <SideItem
                    title={`${user.first_name} ${user.last_name}`}
                    link="/profile"
                    icon={<div className="w-[36px] h-[36px] relative">
                        <Image
                            className="rounded-full"
                            layout="fill"
                            src={user.image}
                            alt=""
                        />
                    </div>}
                />
                : <SideItemLoading />}

            <SideItem
                title="Friends"
                link="/friends"
                icon={<FontAwesomeIcon icon={faUsers} />}
            />

            <SideItem
                title="Pokes"
                link="/pokes"
                icon={<FontAwesomeIcon icon={faHandLizard} />}
            />

            <SideItem
                title="GitHub"
                link="https://github.com/CubeStorm/"
                icon={<FontAwesomeIcon icon={faGithub} />}
                target="_blank"
            />
        </aside>
    );
}