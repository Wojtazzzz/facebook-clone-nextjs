import { Form } from './Form';

interface ContentProps {
    isEditModeActive: boolean;
    content: string;
    resourceId: number;
    commentId: number;
    authorName: string;
    closeEditMode: () => void;
}

export const Content = ({
    isEditModeActive,
    content,
    authorName,
    resourceId,
    commentId,
    closeEditMode,
}: ContentProps) => {
    if (isEditModeActive) {
        return <Form content={content} postId={resourceId} commentId={commentId} closeEditMode={closeEditMode} />;
    }

    return (
        <div className="w-fit flex flex-col bg-dark-100 text-sm text-light-200 rounded-3xl py-2 px-3">
            <span className="font-medium">{authorName}</span>
            <span>{content}</span>
        </div>
    );
};
