import { usePaginatedData } from '@hooks/usePaginatedData';

import { List } from '@components/pages/posts/post/comments/List';
import { Create } from '@components/pages/posts/post/comments/create/Create';

import type { CommentType } from '@ctypes/features/CommentType';

interface CommentsProps {
    postId: number;
}

export const Comments = ({ postId }: CommentsProps) => {
    const comments = usePaginatedData<CommentType>(`/api/posts/${postId}/comments`);

    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} reloadComments={comments.reloadData} />
            <List {...comments} />
        </section>
    );
};
