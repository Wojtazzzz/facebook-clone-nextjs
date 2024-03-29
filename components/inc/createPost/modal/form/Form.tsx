import { Formik, Form as FormikForm } from 'formik';
import { CreatePostSchema } from './CreatePostSchema';
import type { IPostCreatePayload } from '@utils/types';
import { useCreatePost } from './useCreatePost';
import { FormContent } from './formContent/FormContent';
import type { QueryKey } from '@tanstack/react-query';

interface FormProps {
    queryKey: QueryKey;
    close: () => void;
}

export const Form = ({ queryKey, close }: FormProps) => {
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
