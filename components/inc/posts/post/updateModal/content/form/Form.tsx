import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { UpdatePostSchema } from '@validation/UpdatePostSchema';
import type { IPostUpdatePayload } from '@utils/types';
import { useUpdatePost } from './useUpdatePost';
import { FormContent } from './formContent/FormContent';

interface FormProps {
    queryKey: unknown[];
    postId: number;
    content: string;
    images: string[];
    closeModal: () => void;
}

export const Form = ({ queryKey, postId, content, images, closeModal }: FormProps) => {
    const { update, isLoading, error } = useUpdatePost(queryKey);

    const handleSubmit: IHandleSubmit = (values, { setValues }) => {
        setValues((prevValue) => ({
            ...prevValue,
            imagesToDelete: [],
        }));

        update(postId, values, closeModal);
    };

    const initialValues: IPostUpdatePayload = {
        content,
        images: [],
        imagesToDelete: [],
    };

    return (
        <Formik initialValues={initialValues} validationSchema={UpdatePostSchema} onSubmit={handleSubmit}>
            <FormikForm>
                <FormContent images={images} isLoading={isLoading} error={error} />
            </FormikForm>
        </Formik>
    );
};

type IHandleSubmit = (values: IPostUpdatePayload, actions: FormikHelpers<IPostUpdatePayload>) => void;
