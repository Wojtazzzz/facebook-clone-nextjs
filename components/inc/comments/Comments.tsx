import { Create } from './create/Create';
import { Header } from './Header';
import { List } from './list/List';
import { TurnedOff } from './TurnedOff';

interface CommentsProps {
    postId: number;
    authorName: string;
    commenting: boolean;
}

export const Comments = ({ postId, authorName, commenting }: CommentsProps) => {
    if (!commenting) return <TurnedOff authorName={authorName} />;

    return (
        <section
            aria-labelledby={`post-${postId}-comments-header`}
            className="w-full border-t-2 border-t-dark-100 p-1 md:p-2"
        >
            <Header postId={postId} />
            <Create postId={postId} />
            <List postId={postId} />
        </section>
    );
};
