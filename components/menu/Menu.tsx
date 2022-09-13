import { faHandLizard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ProfileLink } from '@components/menu/profileLink/ProfileLink';
import { Link } from '@components/menu/Link';
import { clsx } from 'clsx';
import { useOutsideClick } from '@hooks/useOutsideClick';

interface MenuProps {
    isActive: boolean;
    close: () => void;
}

export const Menu = ({ isActive, close }: MenuProps) => {
    const handleClose = () => {
        if (!screen) return;
        if (screen.width > 768) return;

        close();
    };

    const ref = useOutsideClick(handleClose);

    return (
        <nav
            ref={ref}
            data-testid="menu"
            className={clsx(
                'w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col fixed lg:relative top-0 left-0 bg-dark-300 transition-transform z-30 py-5 px-2',
                !isActive && '-translate-x-[300px] lg:translate-x-[0px]'
            )}
        >
            <ul>
                <ProfileLink />

                <Link title="Friends" link="/friends" icon={faUsers} />
                <Link title="Pokes" link="/friends/pokes" icon={faHandLizard} />
                <Link title="GitHub" link="https://github.com/CubeStorm/" icon={faGithub} target="_blank" />
            </ul>
        </nav>
    );
};
