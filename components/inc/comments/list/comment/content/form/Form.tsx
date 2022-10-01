import type { ICommentPayload } from '@utils/types';
import { CommentSchema } from '@components/inc/comments/CommentSchema';
import type { FormikHelpers } from 'formik';
import { Formik, Form as FormikForm } from 'formik';
import { FormContent } from './formContent/FormContent';
import { useUpdateComment } from './useUpdateComment';

interface FormProps {
    content: string;
    postId: number;
    commentId: number;
    closeEditMode: () => void;
}

export const Form = ({ content, postId, commentId, closeEditMode }: FormProps) => {
    const { update, isLoading, isError } = useUpdateComment();

    const handleSubmit: IHandleSubmit = ({ content }) => {
        update({ content, resourceId: postId, commentId }, closeEditMode);
    };

    const initialValues = { content };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CommentSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            <FormikForm className="w-full">
                <FormContent isLoading={isLoading} isError={isError} />
            </FormikForm>
        </Formik>
    );
};

type IHandleSubmit = (comment: ICommentPayload, helpers: FormikHelpers<ICommentPayload>) => void;
