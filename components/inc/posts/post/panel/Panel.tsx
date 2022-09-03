import { CommentButton } from './CommentButton';
import { LikeButton } from './likeButton/LikeButton';
import { ShareButton } from './ShareButton';

interface PanelProps {
    postId: number;
    isPostLiked: boolean;
    queryKey: unknown[];
    toggleCommentsActive: () => void;
}

export const Panel = ({ postId, isPostLiked, queryKey, toggleCommentsActive }: PanelProps) => {
    return (
        <div className="w-full flex justify-evenly gap-2 p-2">
            <LikeButton postId={postId} isLiked={isPostLiked} queryKey={queryKey} />
            <CommentButton toggleCommentsActive={toggleCommentsActive} />
            <ShareButton />
        </div>
    );
};
