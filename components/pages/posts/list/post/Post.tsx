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
    is_liked,
    is_edited,
    created_at,
    type,
}: PostProps) => {
    const [areCommentsActive, setAreCommentsActive] = useState(false);
    const handleToggleAreCommentsActive = () => setAreCommentsActive((prevState) => !prevState);

    return (
        <article aria-label="Post" className="w-full bg-dark-200 rounded-lg">
            <Header postId={id} author={author} createdAt={created_at} isEdited={is_edited} type={type} />

            <Content content={content} images={images} />

            <Stats
                postId={id}
                likesCount={likes_count}
                commentsCount={comments_count}
                toggleCommentsActive={handleToggleAreCommentsActive}
            />

            <Panel postId={id} isPostLiked={is_liked} toggleAreCommentsActive={handleToggleAreCommentsActive} />

            {areCommentsActive && <Comments postId={id} />}
        </article>
    );
};
