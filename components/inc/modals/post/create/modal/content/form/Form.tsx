import { Formik, Form as FormikForm } from 'formik';
import { CreatePostSchema } from '@validation/CreatePostSchema';
import type { IPostCreatePayload } from '@utils/types';
import { useCreatePost } from './useCreatePost';
import { useCreatePostModal } from '../../../useCreatePostModal';
import { FormContent } from './formContent/FormContent';

interface FormProps {
    queryKey: unknown[];
}

export const Form = ({ queryKey }: FormProps) => {
    const { close } = useCreatePostModal();
    const { create, isLoading, error } = useCreatePost(queryKey);

    const handleSubmit = (values: IPostCreatePayload) => {
        create(values, close);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={CreatePostSchema} onSubmit={handleSubmit}>
            <FormikForm>
                <FormContent isLoading={isLoading} error={error} />
            </FormikForm>
        </Formik>
    );
};

const initialValues = { content: '', images: [] };
