import { faHome, faShop } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from './NavItem';
import { UserNavItem } from './userNavItem/UserNavItem';

export const Desktop = () => {
    return (
        <div data-testid="desktop-navbar" className="w-1/3 h-full hidden lg:flex justify-center gap-2">
            <NavItem name="Home page" path="/" icon={faHome} />
            <NavItem name="Marketplace page" path="/marketplace" icon={faShop} />
            <UserNavItem />
        </div>
    );
};
