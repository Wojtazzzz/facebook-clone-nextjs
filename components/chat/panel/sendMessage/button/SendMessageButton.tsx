import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const SendMessageButton = () => {
    return <RoundedButton type="submit" label="Send message" icon={faCircleCheck} callback={() => null} />;
};
