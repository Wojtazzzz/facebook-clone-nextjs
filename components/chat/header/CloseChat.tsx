import { useChat } from '@hooks/useChat';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import { useDispatch } from 'react-redux';
import { closeChat } from '@redux/slices/ChatSlice';

export const CloseChat = () => {
    const dispatch = useDispatch();

    const handleCloseChat = () => dispatch(closeChat());

    return (
        <RoundedButton
            name="Close chat"
            icon={faTimes}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={handleCloseChat}
        />
    );
};
