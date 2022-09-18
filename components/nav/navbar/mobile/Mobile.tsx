import { faHome, faShop } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '@components/nav/navbar/mobile/Logo';
import { NavItem } from './NavItem';
import { clsx } from 'clsx';
import { NavToggler } from './NavToggler';
import { useMobileNavbar } from './useMobileNavbar';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { UserNavItem } from './userNavItem/UserNavItem';

export const Mobile = () => {
    const { isActive, close, toggleActive } = useMobileNavbar();
    const ref = useOutsideClick<HTMLDivElement>(close);

    return (
        <div data-testid="mobile-navbar" ref={ref} className="lg:hidden">
            <div
                className={clsx(
                    'w-[260px] h-screen lg:hidden fixed top-0 left-0 z-30 bg-dark-300 transition-transform ease-out shadow-md',
                    isActive ? 'translate-x-0' : '-translate-x-[260px]'
                )}
            >
                <Logo />

                <div className="flex flex-col gap-3">
                    <NavItem label="Home page" title="Marketplace" path="/" icon={faHome} />
                    <NavItem label="Marketplace page" title="Marketplace" path="/marketplace" icon={faShop} />
                    <UserNavItem />
                </div>
            </div>

            <NavToggler isActive={isActive} toggle={toggleActive} />
        </div>
    );
};
