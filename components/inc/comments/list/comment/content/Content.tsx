import { Likes } from './likes/Likes';
import { Form } from './form/Form';

interface ContentProps {
    isEditModeActive: boolean;
    content: string;
    postId: number;
    commentId: number;
    likesCount: number;
    authorName: string;
    closeEditMode: () => void;
}

export const Content = ({
    isEditModeActive,
    content,
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
            <span className="font-medium">{authorName}</span>
            <span>{content}</span>

            {!!likesCount && <Likes commentId={commentId} contentLength={content.length} count={likesCount} />}
        </div>
    );
};
