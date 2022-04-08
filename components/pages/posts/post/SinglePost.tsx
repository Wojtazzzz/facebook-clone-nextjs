import { useLikes } from '@hooks/useLikes';
import { useEffect, useState } from 'react';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Images } from '@components/pages/posts/post/Images';
import { Stats } from '@components/pages/posts/post/Stats';
import { Panel } from '@components/pages/posts/post/Panel';

import type { PostType } from '@ctypes/features/PostType';

interface SinglePostProps extends PostType {}

export const SinglePost = ({
    id,
    content,
    images,
    author,
    likes_count,
    isLiked,
    created_at,
    updated_at,
}: SinglePostProps) => {
    const [totalLikesCount, setTotalLikesCount] = useState(likes_count);
    const [_isLiked, _setIsLiked] = useState(isLiked);
    const { state: likesState, handleLike } = useLikes(id);

    useEffect(() => {
        if (likesState.status !== 'SUCCESS') return;

        setTotalLikesCount(likesState.data.data.likesCount);
        _setIsLiked((prevState) => !prevState);
    }, [likesState]);

    return (
        <div className="w-full bg-dark-200 rounded-lg">
            <Header author={author} created_at={created_at} updated_at={updated_at} />

            <div className="w-full py-3">
                <Content content={content} />

                {!!images?.length && <Images images={images} />}
            </div>

            <Stats likesCount={totalLikesCount} />
            <Panel isLiked={_isLiked} handleLike={handleLike} />
        </div>
    );
};
