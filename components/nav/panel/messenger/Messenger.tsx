import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleActive } from '@redux/slices/MessengerSlice';
import { Dropdown } from '../inc/Dropdown';
import { OpenButton } from '../inc/OpenButton';

export const Messenger = () => {
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((store) => store.messenger);

    const handleOpen = () => dispatch(toggleActive(true));
    const handleClose = () => dispatch(toggleActive(false));

    return (
        <div className="relative">
            <OpenButton name="Messenger" icon={faFacebookMessenger} callback={handleOpen} />

            {isActive && <Dropdown type="Messenger" close={handleClose} />}
        </div>
    );
};
