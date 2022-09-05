import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import { useSendMessage } from '../useSendMessage';

export const LikeButton = () => {
    const { sendMessage } = useSendMessage();
    const handleSendLike = () => sendMessage('👍');

    return (
        <RoundedButton
            name="Send like"
            icon={faThumbsUp}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={handleSendLike}
        />
    );
};
