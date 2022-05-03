import { useState } from 'react';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Stats } from '@components/pages/posts/post/Stats';

import type { PostType } from '@ctypes/features/PostType';
import { faMessage, faShare } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from './inc/PanelButton';
import { LikeButton } from './panel/LikeButton';

interface PostProps extends PostType {}

export const Post = ({
    id,
    content,
    images,
    author,
    likes_count,
    // comments_count,
    isLiked,
    created_at,
    updated_at,
}: PostProps) => {
    const [totalLikesCount, setTotalLikesCount] = useState(likes_count);
    const [totalCommentsCount, setTotalCommentsCount] = useState(7);

    return (
        <div className="w-full bg-dark-200 rounded-lg">
            <Header author={author} created_at={created_at} updated_at={updated_at} />
            <Content content={content} images={images} />
            <Stats likesCount={totalLikesCount} commentsCount={totalCommentsCount} />

            <div className="w-full flex justify-evenly gap-2 border-t-2 border-t-dark-100 p-2">
                <LikeButton postId={id} isLiked={isLiked} setTotalLikes={setTotalLikesCount} />

                <PanelButton title="Comment" icon={faMessage} callback={() => console.log('Comment action..')} />
                <PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
            </div>
        </div>
    );
};
