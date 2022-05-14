import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import Link from 'next/link';
import { UpdateForm } from '@components/pages/posts/post/comments/inc/UpdateForm';
import { DeleteModal } from '@components/pages/posts/post/comments/inc/delete/DeleteModal';
import { LikeAction } from '@components/pages/posts/post/comments/inc/actions/LikeAction';
import { ReplyAction } from '@components/pages/posts/post/comments/inc/actions/ReplyAction';
import { EditAction } from '@components/pages/posts/post/comments/inc/actions/EditAction';
import { DeleteAction } from '@components/pages/posts/post/comments/inc/actions/DeleteAction';
import { Avatar } from '@components/inc/Avatar';

import type { CommentType } from '@ctypes/features/CommentType';

interface CommentProps extends CommentType {}

export const Comment = ({ id, content, author, resource_id, created_at, updated_at }: CommentProps) => {
    const [isEditModeActive, setIsEditModeActive] = useState(false);
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const { user } = useAuth();

    return (
        <>
            <article className="w-full flex gap-2 px-3 py-1">
                <Link href={`/profile/${author.id}`}>
                    <a>
                        <Avatar src={author.profile_image} size={36} alt="" />
                    </a>
                </Link>

                <div className="w-full flex flex-col gap-1">
                    <div
                        className={`${
                            isEditModeActive ? 'w-full' : 'w-fit'
                        } flex flex-col bg-dark-100 text-sm text-light-200 rounded-3xl py-2 px-3`}
                    >
                        <span className="font-medium">{author.name}</span>

                        {isEditModeActive ? (
                            <UpdateForm
                                postId={resource_id}
                                commentId={id}
                                content={content}
                                closeEditMode={() => setIsEditModeActive(false)}
                            />
                        ) : (
                            <span>{content}</span>
                        )}
                    </div>

                    <div className="flex gap-2 pl-3">
                        <LikeAction />
                        <ReplyAction />

                        {author.id === user?.id && (
                            <>
                                <EditAction
                                    isEditModeActive={isEditModeActive}
                                    toggleEditMode={() => setIsEditModeActive((prevState) => !prevState)}
                                />

                                <DeleteAction showDeleteModal={() => setIsDeleteModalActive(true)} />
                            </>
                        )}

                        <span className="text-xs text-light-100 font-bold">
                            {updated_at} {created_at !== updated_at && '(Edited)'}
                        </span>
                    </div>
                </div>
            </article>

            {isDeleteModalActive && (
                <DeleteModal postId={resource_id} commentId={id} closeModal={() => setIsDeleteModalActive(false)} />
            )}
        </>
    );
};
