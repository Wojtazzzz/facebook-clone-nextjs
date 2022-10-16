import type { IComment } from '@utils/types';
import { AuthorImage } from './AuthorImage';
import { Panel } from './panel/Panel';
import { Content } from './content/Content';
import { useEditMode } from './useEditMode';

interface CommentProps extends IComment {}

export const Comment = ({
    id,
    content,
    author,
    commentable_id,
    is_edited,
    is_liked,
    likes_count,
    created_at,
}: CommentProps) => {
    const { isEditModeActive, toggleEditMode, closeEditMode } = useEditMode();

    return (
        <article aria-label={`${author.name}'s comment`} className="w-full flex gap-2 px-2 md:px-3 py-1">
            <AuthorImage id={author.id} name={author.name} profileImage={author.profile_image} />

            <div className="w-full flex flex-col gap-1">
                <Content
                    likesCount={likes_count}
                    isEditModeActive={isEditModeActive}
                    content={content}
                    postId={commentable_id}
                    commentId={id}
                    authorId={author.id}
                    authorName={author.name}
                    closeEditMode={closeEditMode}
                />

                <Panel
                    isLiked={is_liked}
                    isEdited={is_edited}
                    createdAt={created_at}
                    postId={commentable_id}
                    commentId={id}
                    authorId={author.id}
                    isEditModeActive={isEditModeActive}
                    toggleEditMode={toggleEditMode}
                />
            </div>
        </article>
    );
};
