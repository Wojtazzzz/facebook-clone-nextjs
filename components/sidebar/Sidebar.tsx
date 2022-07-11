import { useAppSelector } from '@hooks/redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandLizard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { UserLink } from '@components/sidebar/inc/UserLink';
import { Link } from '@components/sidebar/inc/Link';

import { clsx } from 'clsx';

export const Sidebar = () => {
    const { isActive } = useAppSelector((store) => store.sidebar);

    return (
        <aside
            data-testid="sidebar"
            className={clsx(
                'w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col fixed lg:relative top-0 left-0 bg-dark-300 transition-transform z-30 py-5 px-2',
                !isActive && '-translate-x-[300px] lg:translate-x-[0px]'
            )}
        >
            <UserLink />

            <Link title="Friends" link="/friends" icon={<FontAwesomeIcon icon={faUsers} />} />
            <Link title="Pokes" link="/friends/pokes" icon={<FontAwesomeIcon icon={faHandLizard} />} />
            <Link
                title="GitHub"
                link="https://github.com/CubeStorm/"
                icon={<FontAwesomeIcon icon={faGithub} />}
                target="_blank"
            />
        </aside>
    );
};
