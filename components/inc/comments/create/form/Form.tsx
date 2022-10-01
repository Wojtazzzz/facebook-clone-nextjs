import type { ICommentPayload } from '@utils/types';
import { CommentSchema } from '@components/inc/comments/CommentSchema';
import type { FormikHelpers } from 'formik';
import { Formik, Form as FormikForm } from 'formik';
import { FormContent } from './formContent/FormContent';
import { useCreateComment } from './useCreateComment';

interface FormProps {
    postId: number;
}

export const Form = ({ postId }: FormProps) => {
    const { create, isLoading, isError } = useCreateComment();

    const handleSubmit: IHandleSubmit = ({ content }, { resetForm }) => {
        create({ content, resourceId: postId }, resetForm);
    };

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

const initialValues = {
    content: '',
};
