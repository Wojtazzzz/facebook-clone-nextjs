import { RoundedButton } from '@components/inc/RoundedButton';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from './useLogout';

export const Logout = () => {
    const { logout, isLoading } = useLogout();

    return (
        <RoundedButton
            name="Log out"
            icon={faRightFromBracket}
            onHover="opacity-70"
            isDisabled={isLoading}
            callback={logout}
        />
    );
};
