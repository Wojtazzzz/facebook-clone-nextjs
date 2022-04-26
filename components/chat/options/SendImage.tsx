import { faImage } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SendImage = () => {
    const handleSendImage = () => alert('Maybe in the future...');

    return (
        <RoundedButton
            name="Send image"
            icon={faImage}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={handleSendImage}
        />
    );
};
