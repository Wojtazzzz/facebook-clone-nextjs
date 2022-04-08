import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/shared/PanelButton';

interface PanelProps {
    isLiked: boolean;
    handleLike: (isLiked: boolean) => void;
}

export const Panel = ({ isLiked, handleLike }: PanelProps) => {
    const handleLikePost = () => handleLike(isLiked);

    return (
        <div className="w-full flex justify-evenly gap-2 border-t-2 border-t-dark-100 p-2">
            <PanelButton title="Like" icon={faThumbsUp} isActive={isLiked} callback={handleLikePost} />
            <PanelButton title="Comment" icon={faMessage} callback={() => console.log('Comment action..')} />
            <PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
        </div>
    );
};
