import { useState } from 'react';
import type { IUser } from '@utils/types';
import { Author } from './Author';
import { Panel } from './Panel';
import { Date } from './Date';
import { Content } from './content/Content';

interface CommentProps {
    id: number;
    content: string;
    author: IUser;
    resource_id: number;
    is_edited: boolean;
    created_at: string;
}

export const Comment = ({ id, content, author, resource_id, created_at, is_edited }: CommentProps) => {
    const [isEditModeActive, setIsEditModeActive] = useState(false);

    const handleToggleIsEditModeActive = () => setIsEditModeActive((prevState) => !prevState);
    const handleCloseEditMode = () => setIsEditModeActive(false);

    return (
        <article aria-label="Comment" className="w-full flex gap-2 px-3 py-1">
            <Author id={author.id} profileImage={author.profile_image} />

            <div className="w-full flex flex-col gap-1">
                <Content
                    isEditModeActive={isEditModeActive}
                    content={content}
                    resourceId={resource_id}
                    commentId={id}
                    authorName={author.name}
                    closeEditMode={handleCloseEditMode}
                />

                <div className="flex gap-2 pl-3">
                    <Panel
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
