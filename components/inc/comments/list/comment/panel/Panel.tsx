import { useAuth } from '@hooks/useAuth';
import { Date } from './Date';
import { Delete } from './delete/Delete';
import { Edit } from './edit/Edit';
import { Like } from './like/Like';
import { Reply } from './reply/Reply';

interface PanelProps {
    isLiked: boolean;
    isEdited: boolean;
    createdAt: string;
    postId: number;
    commentId: number;
    authorId: number;
    isEditModeActive: boolean;
    toggleEditMode: () => void;
}

export const Panel = ({
    postId,
    commentId,
    authorId,
    isEditModeActive,
    isLiked,
    isEdited,
    createdAt,
    toggleEditMode,
}: PanelProps) => {
    const { user } = useAuth();

    const isAuthor = authorId === user?.id;

    return (
        <div className="flex gap-3 pl-3">
            <Like isLiked={isLiked} commentId={commentId} postId={postId} />
            <Reply />

            {isAuthor && (
                <>
                    <Edit isEditModeActive={isEditModeActive} toggleEditMode={toggleEditMode} />
                    <Delete postId={postId} commentId={commentId} />
                </>
            )}

            <Date createdAt={createdAt} isEdited={isEdited} />
        </div>
    );
};
