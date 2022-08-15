import { useComments } from '@hooks/useComments';
import { ICommentPayload } from '@utils/types';
import { FormikHelpers } from 'formik';
import { Form as CreateForm } from '../../inc/Form';

interface FormProps {
    postId: number;
}

export const Form = ({ postId }: FormProps) => {
    const { useCreate } = useComments();
    const { create, isLoading, isError, error } = useCreate();

    const handleSubmit = async ({ content }: ICommentPayload, { resetForm }: FormikHelpers<ICommentPayload>) => {
        create({ content, resourceId: postId }, resetForm);
    };

    return <CreateForm isLoading={isLoading} isError={isError} error={error} handleSubmit={handleSubmit} />;
};
