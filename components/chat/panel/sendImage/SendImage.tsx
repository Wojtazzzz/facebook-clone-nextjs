import { faImage } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SendImage = () => {
    const handleSendImage = () => alert('Maybe in the future...');

    return <RoundedButton label="Send image" icon={faImage} callback={handleSendImage} />;
};
