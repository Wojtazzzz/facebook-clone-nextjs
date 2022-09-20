import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../inc/Button';
import { useSendMessage } from '../useSendMessage';

export const SendLike = () => {
    const { sendLike } = useSendMessage();

    return <Button type="button" label="Send like" icon={faThumbsUp} callback={sendLike} />;
};
