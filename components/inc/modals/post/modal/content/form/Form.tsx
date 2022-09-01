import { Formik, Form as FormikForm } from 'formik';
import { PostCreateSchema } from '@validation/PostCreateSchema';
import type { IPostPayload } from '@utils/types';
import { useCreatePost } from './useCreatePost';
import { useCreatePostModal } from '../../../useCreatePostModal';
import { FormContent } from './formContent/FormContent';

export const Form = () => {
    const { close } = useCreatePostModal();
    const { create, isLoading, error } = useCreatePost();

    const handleSubmit = (values: IPostPayload) => {
        create(values, close);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={PostCreateSchema} onSubmit={handleSubmit}>
            <FormikForm>
                <FormContent isLoading={isLoading} error={error} />
            </FormikForm>
        </Formik>
    );
};

const initialValues = { content: '', images: [] };
