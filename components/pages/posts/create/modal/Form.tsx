import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useAuth } from '@hooks/useAuth';
import { usePosts } from '@hooks/usePosts';

import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { ImageUploader } from '@components/pages/posts/create/modal/inc/ImageUploader';
import { Errors } from '@components/pages/posts/create/modal/responses/Errors';
import { UserInfo } from '@components/pages/posts/create/modal/inc/UserInfo';
import { Button } from '@components/inc/Button';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

import { hideModal } from '@redux/slices/CreatePostModalSlice';

import { PostSchema } from '@validation/PostSchema';

export const Form = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const { state, isLoading, createPost } = usePosts();

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        dispatch(hideModal());
    }, [state, dispatch]);

    if (isLoading) return <SpinnerLoader testid="createPost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <Formik initialValues={{ content: '', images: [] }} validationSchema={PostSchema} onSubmit={createPost}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <div className="w-full p-4">
                        {user && (
                            <div className="w-full">
                                <UserInfo user={user} />

                                <textarea
                                    aria-label="Post content"
                                    name="content"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.content}
                                    placeholder={`What's on your mind, ${user.first_name}?`}
                                    className="w-full text-lg text-light-100 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-dark-200 p-3"
                                ></textarea>
                            </div>
                        )}
                    </div>

                    {isUploadActive && (
                        <ImageUploader
                            handleDrop={(acceptedFiles) =>
                                setFieldValue('images', [...values.images, ...acceptedFiles])
                            }
                            handleClose={() => setIsUploadActive(false)}
                        />
                    )}

                    <Errors error={state.status === 'ERROR' && state.error} />

                    <div className="w-full p-3">
                        <div className="w-full flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
                            <span className="text-light-200 font-medium">Add to your post</span>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={() => setIsUploadActive((prevState) => !prevState)}
                                >
                                    <FontAwesomeIcon icon={faImages} className="text-2xl text-green-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pb-4 px-4">
                        <Button type="submit" title="Create post" isDisabled={isLoading} styles="w-full" />
                    </div>
                </form>
            )}
        </Formik>
    );
};
