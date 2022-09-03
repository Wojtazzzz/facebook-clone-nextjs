import type { IComment } from '@utils/types';
import { Author } from './Author';
import { Panel } from './panel/Panel';
import { Content } from './content/Content';
import { useEditMode } from './useEditMode';

interface CommentProps extends IComment {}

export const Comment = ({
    id,
    content,
    author,
    resource_id,
    is_edited,
    is_liked,
    likes_count,
    created_at,
}: CommentProps) => {
    const { isEditModeActive, toggleEditMode, closeEditMode } = useEditMode();

    return (
        <article aria-label="Comment" className="w-full flex gap-2 px-3 py-1">
            <Author id={author.id} profileImage={author.profile_image} />

            <div className="w-full flex flex-col gap-1">
                <Content
                    likesCount={likes_count}
                    isEditModeActive={isEditModeActive}
                    content={content}
                    resourceId={resource_id}
                    commentId={id}
                    authorName={author.name}
                    closeEditMode={closeEditMode}
                />

                <Panel
                    isLiked={is_liked}
                    isEdited={is_edited}
                    createdAt={created_at}
                    postId={resource_id}
                    commentId={id}
                    authorId={author.id}
                    isEditModeActive={isEditModeActive}
                    toggleEditMode={toggleEditMode}
                />
            </div>
        </article>
    );
};
