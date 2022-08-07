import { useEffect, useRef } from 'react';
import { useComments } from '@hooks/useComments';

import { Form, Formik } from 'formik';
import { Errors } from '@components/pages/posts/post/comments/inc/Errors';
import { SubmitButton } from '@components/pages/posts/post/comments/create/inc/SubmitButton';

import { CommentSchema } from '@validation/CommentSchema';

import type { ICommentPayload } from '@utils/types';

interface UpdateFormProps {
    postId: number;
    commentId: number;
    content: string;
    closeEditMode: () => void;
}

export const UpdateForm = ({ postId, commentId, content, closeEditMode }: UpdateFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { useUpdate } = useComments();
    const { update, isLoading, isError, error } = useUpdate();

    useEffect(() => {
        handleFocusInput();
    }, []);

    const handleFocusInput = () => {
        if (!inputRef.current) return;

        inputRef.current.focus();
    };

    const handleUpdateComment = (data: ICommentPayload) => {
        update(commentId, data, closeEditMode);
    };

    return (
        <Formik
            initialValues={{ content, resource_id: postId }}
            validationSchema={CommentSchema}
            onSubmit={handleUpdateComment}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Form className="w-full" onSubmit={handleSubmit}>
                    <button aria-label="Enter new comment value" onClick={handleFocusInput}>
                        <small className="text-xs text-light-100 font-medium">Enter new value</small>
                    </button>

                    <div className="w-full flex justify-between bg-dark-100 text-light-200 rounded-3xl focus:outline-none px-2">
                        <input
                            ref={inputRef}
                            aria-label="Update comment"
                            name="content"
                            value={values.content}
                            placeholder="Write a comment..."
                            autoComplete="off"
                            className="w-full bg-transparent focus:outline-none"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        <SubmitButton isLoading={isLoading} callback={handleSubmit} />
                    </div>

                    <Errors error={isError && error} />
                </Form>
            )}
        </Formik>
    );
};
