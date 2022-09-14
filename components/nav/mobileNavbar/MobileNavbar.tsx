import { faHome, faSearch, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '@components/nav/mobileNavbar/Logo';
import { NavItem } from '@components/nav/mobileNavbar/NavItem';
import { clsx } from 'clsx';
import { NavToggler } from './NavToggler';
import { useMobileNavbar } from './useMobileNavbar';
import { useAuth } from '@hooks/useAuth';
import { useOutsideClick } from '@hooks/useOutsideClick';

export const MobileNavbar = () => {
    const { isActive, close, toggleActive } = useMobileNavbar();
    const { user } = useAuth();

    const handleClose = () => {
        if (!screen) return;
        if (screen.width > 1024) return;

        close();
    };

    const ref = useOutsideClick(handleClose);

    const profilePageLink = user ? `/profile/${user.id}` : '/profile/not-loaded';

    return (
        <>
            <div
                ref={ref}
                className={clsx(
                    'w-[280px] h-screen lg:hidden fixed top-0 left-0 z-30 bg-dark-300 transition-transform ease-out shadow-md',
                    isActive && 'translate-x-0',
                    !isActive && '-translate-x-[280px]'
                )}
            >
                <Logo />

                <div className="flex flex-col gap-3">
                    <NavItem name="Home" path="/" icon={faHome} />
                    <NavItem name="Marketplace" path="/marketplace" icon={faShop} />
                    <NavItem name="Profile" path={profilePageLink} icon={faUser} />
                    <NavItem name="Search user" path="/search" icon={faSearch} />
                </div>
            </div>

            <NavToggler isActive={isActive} toggleActive={toggleActive} />
        </>
    );
};
