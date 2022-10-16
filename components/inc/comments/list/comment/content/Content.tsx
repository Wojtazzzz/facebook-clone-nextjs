import { Likes } from './likes/Likes';
import { Form } from './form/Form';
import Link from 'next/link';

interface ContentProps {
    isEditModeActive: boolean;
    content: string;
    authorId: number;
    postId: number;
    commentId: number;
    likesCount: number;
    authorName: string;
    closeEditMode: () => void;
}

export const Content = ({
    isEditModeActive,
    content,
    authorId,
    authorName,
    postId,
    commentId,
    likesCount,
    closeEditMode,
}: ContentProps) => {
    if (isEditModeActive) {
        return <Form content={content} postId={postId} commentId={commentId} closeEditMode={closeEditMode} />;
    }

    return (
        <div className="w-fit flex flex-col bg-dark-100 text-sm text-light-200 relative rounded-3xl py-2 px-3">
            <Link href={`/profile/${authorId}`}>
                <a className="font-medium">{authorName}</a>
            </Link>

            <span>{content}</span>

            {likesCount > 0 && <Likes commentId={commentId} contentLength={content.length} count={likesCount} />}
        </div>
    );
};
