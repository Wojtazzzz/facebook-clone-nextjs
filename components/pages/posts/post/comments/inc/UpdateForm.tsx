import { useEffect, useRef } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { useComments } from '@hooks/useComments';

import { Formik } from 'formik';
import { Errors } from '@components/pages/posts/post/comments/inc/Errors';
import { SubmitButton } from '@components/pages/posts/post/comments/create/inc/SubmitButton';

import { CommentSchema } from '@validation/CommentSchema';

import type { CommentType } from '@ctypes/features/CommentType';

interface UpdateFormProps {
    postId: number;
    commentId: number;
    content: string;
    closeEditMode: () => void;
}

export const UpdateForm = ({ postId, commentId, content, closeEditMode }: UpdateFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { reloadData: reloadComments } = usePaginatedData<CommentType>(`/api/posts/${postId}/comments`);
    const { state, updateComment } = useComments();

    useEffect(() => {
        handleFocusInput();
    }, []);

    useEffect(() => {
        if (state.status === 'LOADING') return;

        if (state.status === 'SUCCESS') {
            reloadComments();
            closeEditMode();
        }
    }, [state, reloadComments, closeEditMode]);

    const handleFocusInput = () => {
        if (!inputRef.current) return;

        inputRef.current.focus();
    };

    return (
        <Formik
            initialValues={{ content, resource_id: postId }}
            validationSchema={CommentSchema}
            onSubmit={(values) => updateComment(commentId, values)}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form className="w-full" onSubmit={handleSubmit}>
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

                        <SubmitButton isLoading={state.status === 'LOADING'} callback={handleSubmit} />
                    </div>

                    <Errors error={state.status === 'ERROR' && state.error} />
                </form>
            )}
        </Formik>
    );
};
