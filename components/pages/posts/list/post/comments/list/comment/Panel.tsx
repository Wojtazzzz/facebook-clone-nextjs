import { useAuth } from '@hooks/useAuth';
import { DeleteAction } from '../../inc/actions/DeleteAction';
import { EditAction } from '../../inc/actions/EditAction';
import { LikeAction } from '../../inc/actions/LikeAction';
import { ReplyAction } from '../../inc/actions/ReplyAction';

interface PanelProps {
    postId: number;
    commentId: number;
    authorId: number;
    isEditModeActive: boolean;
    toggleEditMode: () => void;
}

export const Panel = ({ postId, commentId, authorId, isEditModeActive, toggleEditMode }: PanelProps) => {
    const { user } = useAuth();

    return (
        <div className="flex gap-3">
            <LikeAction />
            <ReplyAction />

            {authorId === user?.id && (
                <>
                    <EditAction isEditModeActive={isEditModeActive} toggleEditMode={toggleEditMode} />
                    <DeleteAction postId={postId} commentId={commentId} />
                </>
            )}
        </div>
    );
};
