import { Comments } from '@components/pages/posts/list/post/stats/Comments';
import { Likes } from '@components/pages/posts/list/post/stats/likes/Likes';

interface StatsProps {
    postId: number;
    likesCount: number;
    commentsCount: number;
    toggleCommentsActive: () => void;
}

export const Stats = ({ postId, likesCount, commentsCount, toggleCommentsActive }: StatsProps) => {
    const areStatsActive = likesCount !== 0 || commentsCount !== 0;

    if (!areStatsActive) {
        return null;
    }

    return (
        <div className="w-full flex items-center text-light-100 border-b-2 border-b-dark-100 p-3">
            {likesCount && <Likes postId={postId} count={likesCount} />}
            <Comments count={commentsCount} toggleCommentsActive={toggleCommentsActive} />
        </div>
    );
};
