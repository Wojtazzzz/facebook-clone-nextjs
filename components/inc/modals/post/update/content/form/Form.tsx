import { Formik, Form as FormikForm } from 'formik';
import { PostSchema } from '@validation/PostSchema';
import type { IPostPayload } from '@utils/types';
import { useUpdatePost } from './useUpdatePost';
import { FormContent } from './formContent/FormContent';
import { useUpdatePostModal } from '../../useUpdatePostModal';

export const Form = () => {
    const { close, post } = useUpdatePostModal();
    const { update, isLoading, error } = useUpdatePost();

    const handleSubmit = (values: IPostPayload) => {
        // update(values, close);
    };

    const initialValues = {
        content: post?.content ?? '',
        images: post?.images ?? [],
    };

    return (
        <Formik initialValues={initialValues} validationSchema={PostSchema} onSubmit={handleSubmit}>
            <FormikForm>
                <FormContent isLoading={isLoading} error={error} />
            </FormikForm>
        </Formik>
    );
};
