import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../inc/Button';
import { useLogout } from './useLogout';

export const Logout = () => {
    const { logout, isLoading } = useLogout();

    return <Button label="Log out" icon={faRightFromBracket} isLoading={isLoading} callback={logout} />;
};
