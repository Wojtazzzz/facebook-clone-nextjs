import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Button } from '../inc/Button';
import { Dropdown } from '../inc/Dropdown';
import { useMessenger } from './useMessenger';

export const Messenger = () => {
    const { isActive, open, close } = useMessenger();

    return (
        <div className="relative">
            <Button label="Messenger" icon={faFacebookMessenger} callback={open} />

            {isActive && <Dropdown type="Messenger" close={close} />}
        </div>
    );
};
