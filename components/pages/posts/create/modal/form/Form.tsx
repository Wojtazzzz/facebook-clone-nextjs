import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { usePosts } from '@hooks/usePosts';

import { Formik, Form as FormikForm } from 'formik';
import { FileDrop } from '@components/pages/posts/create/modal/form/fileDrop/FileDrop';
import { Errors } from '@components/pages/posts/create/modal/responses/Errors';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { SubmitButton } from '@components/pages/posts/create/modal/form/SubmitButton';
import { TextArea } from '@components/pages/posts/create/modal/form/TextArea';
import { DropLabel } from '@components/pages/posts/create/modal/form/fileDrop/DropLabel';
import { UploadedFiles } from '@components/pages/posts/create/modal/form/fileDrop/UploadedFiles';

import { hideModal } from '@redux/slices/CreatePostModalSlice';

import { PostSchema } from '@validation/PostSchema';

import type { PostPayload } from '@ctypes/forms/PostPayload';

export const Form = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);
    const [oldData, setOldData] = useState<PostPayload>({ content: '', images: [] });
    const dispatch = useAppDispatch();
    const { state, isLoading, createPost } = usePosts();

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        dispatch(hideModal());
    }, [state, dispatch]);

    const handleClose = () => setIsUploadActive(false);
    const handleChangeUploadIsActive = () => setIsUploadActive((prevState) => !prevState);

    const handleSubmit = (values: PostPayload) => {
        createPost(values);
        setOldData(values);
    };

    if (isLoading) return <SpinnerLoader testid="createPost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <Formik
            initialValues={{ content: oldData.content, images: oldData.images }}
            validationSchema={PostSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur }) => (
                <FormikForm className="m-3">
                    <TextArea handleChange={handleChange} handleBlur={handleBlur} value={values.content} />

                    {isUploadActive && <FileDrop handleClose={handleClose} />}

                    <UploadedFiles />

                    <Errors error={state.status === 'ERROR' ? state.error : null} />

                    <DropLabel changeUploadActive={handleChangeUploadIsActive} />

                    <SubmitButton isDisabled={isLoading} />
                </FormikForm>
            )}
        </Formik>
    );
};
