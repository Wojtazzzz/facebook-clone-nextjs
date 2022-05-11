import { List } from '@components/pages/posts/post/comments/List';
import { Create } from '@components/pages/posts/post/comments/create/Create';

interface CommentsProps {
    postId: number;
}

export const Comments = ({ postId }: CommentsProps) => {
    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} />
            <List postId={postId} />
        </section>
    );
};
