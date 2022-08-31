import { useState } from 'react';
import type { IComment } from '@utils/types';
import { Author } from './Author';
import { Panel } from './Panel';
import { Date } from './Date';
import { Content } from './content/Content';

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
    const [isEditModeActive, setIsEditModeActive] = useState(false);

    const handleToggleIsEditModeActive = () => setIsEditModeActive((prevState) => !prevState);
    const handleCloseEditMode = () => setIsEditModeActive(false);

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
                    closeEditMode={handleCloseEditMode}
                />

                <div className="flex gap-2 pl-3">
                    <Panel
                        isLiked={is_liked}
                        postId={resource_id}
                        commentId={id}
                        authorId={author.id}
                        isEditModeActive={isEditModeActive}
                        toggleEditMode={handleToggleIsEditModeActive}
                    />

                    <Date createdAt={created_at} isEdited={is_edited} />
                </div>
            </div>
        </article>
    );
};
