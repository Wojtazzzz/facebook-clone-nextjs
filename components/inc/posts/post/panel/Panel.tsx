import { CommentButton } from './CommentButton';
import { LikeButton } from './likeButton/LikeButton';
import { ShareButton } from './ShareButton';
import type { QueryKey } from '@tanstack/react-query';

interface PanelProps {
    postId: number;
    isPostLiked: boolean;
    queryKey: QueryKey;
    toggleCommentsActive: () => void;
}

export const Panel = ({ postId, isPostLiked, queryKey, toggleCommentsActive }: PanelProps) => {
    return (
        <section
            role="menubar"
            aria-label="Post controls"
            className="w-full flex justify-evenly gap-1 md:gap-2 p-1 md:p-2"
        >
            <LikeButton postId={postId} isLiked={isPostLiked} queryKey={queryKey} />
            <CommentButton toggleCommentsActive={toggleCommentsActive} />
            <ShareButton />
        </section>
    );
};
