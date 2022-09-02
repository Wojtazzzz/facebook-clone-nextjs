import { CommentButton } from './CommentButton';
import { LikeButton } from './likeButton/LikeButton';
import { ShareButton } from './ShareButton';

interface PanelProps {
    postId: number;
    isPostLiked: boolean;
    queryKey: unknown[];
    toggleAreCommentsActive: () => void;
}

export const Panel = ({ postId, isPostLiked, queryKey, toggleAreCommentsActive }: PanelProps) => {
    return (
        <div className="w-full flex justify-evenly gap-2 p-2">
            <LikeButton postId={postId} isLiked={isPostLiked} queryKey={queryKey} />
            <CommentButton handleToggleIsCommentsActive={toggleAreCommentsActive} />
            <ShareButton />
        </div>
    );
};
