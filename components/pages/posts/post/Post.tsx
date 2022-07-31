import { useState } from 'react';

import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Header } from '@components/pages/posts/post/header/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Stats } from '@components/pages/posts/post/Stats';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { LikeButton } from '@components/pages/posts/post/panel/LikeButton';
import { Comments } from '@components/pages/posts/post/comments/Comments';
import { CommentButton } from '@components/pages/posts/post/panel/CommentButton';

import type { IPost } from '@utils/types';

interface PostProps extends IPost {
    reloadPosts: () => void;
}

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
    type,
    reloadPosts,
}: PostProps) => {
    const [isCommentsActive, setIsCommentsActive] = useState(false);
    const handleToggleIsCommentsActive = () => setIsCommentsActive((prevState) => !prevState);

    const AreStatsActive = likes_count !== 0 || comments_count !== 0;

    return (
        <article aria-label="Post" className="w-full bg-dark-200 rounded-lg">
            <Header
                postId={id}
                author={author}
                created_at={created_at}
                updated_at={updated_at}
                type={type}
                reloadPosts={reloadPosts}
            />

            <Content content={content} images={images} />

            {AreStatsActive && (
                <Stats
                    likesCount={likes_count}
                    commentsCount={comments_count}
                    handleToggleIsCommentsActive={handleToggleIsCommentsActive}
                />
            )}

            <div className="w-full flex justify-evenly gap-2 p-2">
                <LikeButton postId={id} isLiked={isLiked} />
                <CommentButton handleToggleIsCommentsActive={handleToggleIsCommentsActive} />
                <PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
            </div>

            {isCommentsActive && <Comments postId={id} />}
        </article>
    );
};
