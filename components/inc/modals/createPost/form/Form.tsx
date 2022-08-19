import { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { Formik, Form as FormikForm } from 'formik';
import { FileDrop } from '@components/inc/modals/createPost/form/fileDrop/FileDrop';
import { ErrorMessage } from '@components/inc/modals/createPost/responses/ErrorMessage';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { SubmitButton } from '@components/inc/modals/createPost/form/SubmitButton';
import { ContentInput } from '@components/inc/modals/createPost/form/ContentInput';
import { DropLabel } from '@components/inc/modals/createPost/form/fileDrop/DropLabel';
import { UploadedFiles } from '@components/inc/modals/createPost/form/fileDrop/UploadedFiles';
import { closeModal } from '@redux/slices/CreatePostModalSlice';
import { PostSchema } from '@validation/PostSchema';
import type { IPostPayload } from '@utils/types';
import { useCreate } from './useCreate';

export const Form = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);
    const [oldData, setOldData] = useState<IPostPayload>({ content: '', images: [] });
    const dispatch = useAppDispatch();

    const { create, isLoading, error } = useCreate();

    const handleCloseFileDrop = () => setIsUploadActive(false);
    const handleCloseModal = () => dispatch(closeModal());
    const handleChangeUploadIsActive = () => setIsUploadActive((prevState) => !prevState);

    const handleSubmit = (values: IPostPayload) => {
        setOldData(values);

        create(values, handleCloseModal);
    };

    if (isLoading) return <SpinnerLoader testid="createPost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <Formik
            initialValues={{ content: oldData.content, images: oldData.images }}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
        >
            <FormikForm className="m-3">
                <ContentInput />

                {isUploadActive && <FileDrop handleClose={handleCloseFileDrop} />}

                <UploadedFiles />

                <ErrorMessage error={error} />

                <DropLabel changeUploadActive={handleChangeUploadIsActive} />

                <SubmitButton isDisabled={isLoading} />
            </FormikForm>
        </Formik>
    );
};
