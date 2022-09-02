import type { IPost } from '@utils/types';
import { Content } from './content/Content';
import { Panel } from './panel/Panel';
import { Header } from './header/Header';
import { Stats } from './stats/Stats';
import { Comments } from '@components/inc/comments/Comments';
import { useCommentsActive } from './useCommentsActive';

interface PostProps extends IPost {
    queryKey: unknown[];
}

export const Post = ({
    id,
    content,
    images,
    author,
    likes_count,
    comments_count,
    is_liked,
    is_edited,
    commenting,
    created_at,
    type,
    queryKey,
}: PostProps) => {
    const { commentsActive, toggleCommentsActive } = useCommentsActive();

    return (
        <article aria-label="Post" className="w-full bg-dark-200 rounded-lg">
            <Header
                commenting={commenting}
                postId={id}
                author={author}
                createdAt={created_at}
                isEdited={is_edited}
                type={type}
            />

            <Content content={content} images={images} />

            <Stats
                postId={id}
                likesCount={likes_count}
                commentsCount={comments_count}
                toggleCommentsActive={toggleCommentsActive}
            />

            <Panel
                postId={id}
                isPostLiked={is_liked}
                queryKey={queryKey}
                toggleAreCommentsActive={toggleCommentsActive}
            />

            {commentsActive && <Comments authorName={author.name} commenting={commenting} postId={id} />}
        </article>
    );
};
