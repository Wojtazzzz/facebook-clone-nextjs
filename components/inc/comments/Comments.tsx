import { Create } from './create/Create';
import { Heading } from './Heading';
import { List } from './list/List';
import { TurnedOff } from './TurnedOff';

interface CommentsProps {
    postId: number;
    authorName: string;
    commenting: boolean;
}

export const Comments = ({ postId, authorName, commenting }: CommentsProps) => {
    if (!commenting) return <TurnedOff authorName={authorName} />;

    const headingId = `post-${postId}-comments-heading`;

    return (
        <section aria-labelledby={headingId} className="w-full border-t-2 border-t-dark-100 p-1 md:p-2">
            <Heading id={headingId} />
            <Create postId={postId} />
            <List postId={postId} />
        </section>
    );
};
