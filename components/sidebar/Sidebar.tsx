import { useAuth } from '@hooks/useAuth';
import { useAppSelector } from '@hooks/redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandLizard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from '@components/sidebar/inc/Link';
import { LinkLoader } from '@components/sidebar/inc/LinkLoader';
import { Avatar } from '@components/inc/Avatar';

export const Sidebar = () => {
    const { user } = useAuth();
    const { isActive } = useAppSelector((store) => store.sidebar);

    return (
        <aside
            className={`w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col fixed lg:relative top-0 left-0 bg-dark-300 ${
                isActive ? '' : '-translate-x-[300px] lg:translate-x-[0px]'
            } transition-transform z-30 px-2 py-5`}
        >
            {user ? (
                <Link
                    title={user.name}
                    link={`/profile/${user.id}`}
                    icon={<Avatar size={36} src={user.profile_image} alt={user.name} />}
                />
            ) : (
                <LinkLoader />
            )}

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
