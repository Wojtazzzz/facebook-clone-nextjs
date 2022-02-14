import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandLizard, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { SideItem } from '@components/sidebar/SideItem';
import { SideItemLoading } from '@components/sidebar/SideItemLoading';


export const Sidebar: React.FC = () => {
    const { user } = useAuth();

    return (
        <aside className="w-[300px] h-screen flex flex-col px-2 py-5">
            {user
                ? <SideItem
                    title={`${user.first_name} ${user?.last_name}`}
                    link="/profile"
                    icon={<FontAwesomeIcon icon={faUser} />}
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