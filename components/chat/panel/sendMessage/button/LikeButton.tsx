import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import { useSendMessage } from '../useSendMessage';

export const LikeButton = () => {
    const { sendMessage } = useSendMessage();
    const handleSendLike = () => sendMessage('👍');

    return <RoundedButton label="Send like" icon={faThumbsUp} callback={handleSendLike} />;
};
