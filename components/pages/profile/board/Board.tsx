import { CreatePost } from '@components/pages/profile/board/CreatePost';
import { Posts } from '@components/pages/profile/board/posts/Posts';

export const Board = () => {
    return (
        <div className="w-4/6 flex flex-col gap-4">
            <CreatePost />
            <Posts />
        </div>
    );
};
