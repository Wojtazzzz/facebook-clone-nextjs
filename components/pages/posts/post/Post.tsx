import { useState } from 'react';

import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Stats } from '@components/pages/posts/post/Stats';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { LikeButton } from '@components/pages/posts/post/panel/LikeButton';
import { Comments } from '@components/pages/posts/post/comments/Comments';
import { CommentButton } from '@components/pages/posts/post/panel/CommentButton';

import type { PostType } from '@ctypes/features/PostType';

interface PostProps extends PostType {}

export const Post = ({
    id,
    content,
    images,
    author,
    likes_count,
    comments_count,
    isLiked,
    created_at,
    updated_at,
}: PostProps) => {
    const [isCommentsActive, setIsCommentsActive] = useState(false);
    const [totalLikesCount, setTotalLikesCount] = useState(likes_count);
    const [totalCommentsCount, setTotalCommentsCount] = useState(comments_count);

    const handleToggleIsCommentsActive = () => setIsCommentsActive((prevState) => !prevState);

    const noStats = !(totalLikesCount === 0 && totalCommentsCount === 0);

    return (
        <article aria-label="Post" className="w-full bg-dark-200 rounded-lg">
            <Header postId={id} author={author} created_at={created_at} updated_at={updated_at} />
            <Content content={content} images={images} />

            {noStats && (
                <Stats
                    likesCount={totalLikesCount}
                    commentsCount={totalCommentsCount}
                    handleToggleIsCommentsActive={handleToggleIsCommentsActive}
                />
            )}

            <div className="w-full flex justify-evenly gap-2 p-2">
                <LikeButton postId={id} isLiked={isLiked} setTotalLikes={setTotalLikesCount} />
                <CommentButton handleToggleIsCommentsActive={handleToggleIsCommentsActive} />
                <PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
            </div>

            {isCommentsActive && <Comments postId={id} />}
        </article>
    );
};
