import { useAuth } from '@hooks/useAuth';
import { faHome, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from '@components/nav/navbar/NavItem';

export const Navbar = () => {
    const { user } = useAuth();

    const profilePageLink = user ? `/profile/${user.id}` : '/profile/not-loaded';

    return (
        <div data-testid="desktop-navbar" className="h-full flex justify-center gap-2">
            <NavItem name="Home" path="/" icon={faHome} />
            <NavItem name="Marketplace" path="/marketplace" icon={faShop} />
            <NavItem name="Profile" path={profilePageLink} icon={faUser} />
        </div>
    );
};
