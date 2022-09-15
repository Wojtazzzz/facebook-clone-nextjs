import { Formik, Form as FormikForm } from 'formik';
import { CreatePostSchema } from '@validation/CreatePostSchema';
import type { IPostCreatePayload } from '@utils/types';
import { useCreatePost } from './useCreatePost';
import { FormContent } from './formContent/FormContent';

interface FormProps {
    queryKey: unknown[];
    close: () => void;
}

export const Form = ({ queryKey, close }: FormProps) => {
    const { create, isLoading, error } = useCreatePost(queryKey);

    const handleSubmit = (values: IPostCreatePayload) => {
        create(values, close);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={CreatePostSchema} onSubmit={handleSubmit}>
            <FormikForm className="p-4">
                <FormContent isLoading={isLoading} error={error} />
            </FormikForm>
        </Formik>
    );
};

const initialValues = { content: '', images: [] };
