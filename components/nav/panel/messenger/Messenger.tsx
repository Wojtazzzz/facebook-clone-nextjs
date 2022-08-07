import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleActive } from '@redux/slices/MessengerSlice';
import { Dropdown } from './dropdown/Dropdown';
import { OpenButton } from './OpenButton';

export const Messenger = () => {
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((store) => store.messenger);

    const handleToggle = () => dispatch(toggleActive(true));

    return (
        <div className="relative">
            <OpenButton toggleMessenger={handleToggle} />

            {isActive && <Dropdown />}
        </div>
    );
};
