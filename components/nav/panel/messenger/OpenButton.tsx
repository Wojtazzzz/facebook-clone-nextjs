import { RoundedButton } from '@components/inc/RoundedButton';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

interface OpenButtonProps {
    toggleMessenger: () => void;
}

export const OpenButton = ({ toggleMessenger }: OpenButtonProps) => {
    return (
        <RoundedButton name="Messenger" icon={faFacebookMessenger} onHover="opacity-70" callback={toggleMessenger} />
    );
};
