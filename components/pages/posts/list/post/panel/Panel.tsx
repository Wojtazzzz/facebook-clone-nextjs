import { CommentButton } from './CommentButton';
import { LikeButton } from './LikeButton';
import { ShareButton } from './ShareButton';

interface PanelProps {
    postId: number;
    isPostLiked: boolean;
    toggleAreCommentsActive: () => void;
}

export const Panel = ({ postId, isPostLiked, toggleAreCommentsActive }: PanelProps) => {
    return (
        <div className="w-full flex justify-evenly gap-2 p-2">
            <LikeButton postId={postId} isLiked={isPostLiked} />
            <CommentButton handleToggleIsCommentsActive={toggleAreCommentsActive} />
            <ShareButton />
        </div>
    );
};
