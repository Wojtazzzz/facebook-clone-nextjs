import { useAppSelector } from '@hooks/redux';

import { faHome, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '@components/nav/mobile/Logo';
import { NavItem } from '@components/nav/mobile/NavItem';
import { Search } from '@components/nav/search/Search';
import { clsx } from 'clsx';

export const Navbar = () => {
    const { isActive } = useAppSelector((store) => store.nav);

    return (
        <div
            className={clsx(
                'w-[280px] h-screen lg:hidden fixed top-0 left-0 z-30 bg-dark-200 transition-transform shadow-md',
                isActive && 'translate-x-0',
                !isActive && '-translate-x-[280px]'
            )}
        >
            <Logo />

            <div className="flex flex-col gap-6">
                <NavItem name="Home" path="/" icon={faHome} />
                <NavItem name="Marketplace" path="/marketplace" icon={faShop} />
                <NavItem name="User profile" path="/profile" icon={faUser} />
            </div>

            <div data-testid="nav-search-mobile" className="w-full flex justify-center absolute bottom-[70px]">
                <Search />
            </div>
        </div>
    );
};
