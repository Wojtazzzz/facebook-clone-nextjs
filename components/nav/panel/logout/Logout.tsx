import { RoundedButton } from '@components/inc/RoundedButton';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@hooks/useAuth';

export const Logout = () => {
    const { useLogout } = useAuth();
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
