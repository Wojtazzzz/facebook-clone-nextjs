import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const LikeButton = () => {
    const handleSendLike = () => alert('Maybe in the future...');

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
