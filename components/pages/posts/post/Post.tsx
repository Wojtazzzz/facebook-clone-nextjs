import { useEffect, useState } from 'react';
import { useLikes } from '@hooks/useLikes';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Stats } from '@components/pages/posts/post/Stats';
import { Panel } from '@components/pages/posts/post/Panel';

import type { PostType } from '@ctypes/features/PostType';

interface PostProps extends PostType {}

export const Post = ({ id, content, images, author, likes_count, isLiked, created_at, updated_at }: PostProps) => {
    const [totalLikesCount, setTotalLikesCount] = useState(likes_count);
    const [_isLiked, _setIsLiked] = useState(isLiked);
    const { state, handleLike } = useLikes(id);

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        setTotalLikesCount(state.data.data.likesCount);
        _setIsLiked((prevState) => !prevState);
    }, [state]);

    return (
        <div className="w-full bg-dark-200 rounded-lg">
            <Header author={author} created_at={created_at} updated_at={updated_at} />
            <Content content={content} images={images} />
            <Stats likesCount={totalLikesCount} />
            <Panel isLiked={_isLiked} handleLike={handleLike} />
        </div>
    );
};
