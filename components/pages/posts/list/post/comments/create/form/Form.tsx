import { ICommentPayload } from '@utils/types';
import { FormikHelpers } from 'formik';
import { Form as CreateForm } from '../../inc/Form';
import { useCreate } from './useCreate';

interface FormProps {
    postId: number;
}

export const Form = ({ postId }: FormProps) => {
    const { create, isLoading, isError } = useCreate();

    const handleSubmit = async ({ content }: ICommentPayload, { resetForm }: FormikHelpers<ICommentPayload>) => {
        create({ content, resourceId: postId }, resetForm);
    };

    return <CreateForm isLoading={isLoading} isError={isError} handleSubmit={handleSubmit} />;
};
