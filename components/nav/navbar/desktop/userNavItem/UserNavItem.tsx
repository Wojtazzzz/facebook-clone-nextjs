import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@hooks/useAuth';
import { NavItem } from '../NavItem';
import { NotLoaded } from './NotLoaded';

export const UserNavItem = () => {
    const { user } = useAuth();

    if (!user) return <NotLoaded />;

    return <NavItem name="Profile page" path={`/profile/${user.id}`} icon={faUser} />;
};
