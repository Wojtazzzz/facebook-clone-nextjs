import { useState } from 'react';
import { Header } from '@components/pages/posts/list/post/header/Header';
import { Stats } from '@components/pages/posts/list/post/stats/Stats';
import { Comments } from '@components/pages/posts/list/post/comments/Comments';
import type { IPost } from '@utils/types';
import { Content } from './content/Content';
import { Panel } from './panel/Panel';

interface PostProps extends IPost {}

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
}: PostProps) => {
    const [areCommentsActive, setAreCommentsActive] = useState(false);
    const handleToggleAreCommentsActive = () => setAreCommentsActive((prevState) => !prevState);

    return (
        <article aria-label="Post" className="w-full bg-dark-200 rounded-lg">
            <Header postId={id} author={author} created_at={created_at} updated_at={updated_at} type={type} />

            <Content content={content} images={images} />

            <Stats
                postId={id}
                likesCount={likes_count}
                commentsCount={comments_count}
                toggleCommentsActive={handleToggleAreCommentsActive}
            />

            <Panel postId={id} isPostLiked={isLiked} toggleAreCommentsActive={handleToggleAreCommentsActive} />

            {areCommentsActive && <Comments postId={id} />}
        </article>
    );
};
