import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAxios } from '@hooks/useAxios';

import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { ImageUploader } from '@components/pages/posts/create/modal/inc/ImageUploader';
import { Success } from '@components/pages/posts/create/modal/responses/Success';
import { Errors } from '@components/pages/posts/create/modal/responses/Errors';
import { Button } from '@components/inc/Button';
import { UserInfo } from '@components/pages/posts/create/modal/inc/UserInfo';

import { PostSchema } from '@validation/PostSchema';

import type { CreatePostPayload } from '@ctypes/forms/CreatePostPayload';
import type { CreatePostResponse } from '@ctypes/responses/CreatePostResponse';

export const Form = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);
    const { user } = useAuth();
    const { state, sendRequest } = useAxios<CreatePostResponse>();

    const createPost = (data: CreatePostPayload) => {
        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        sendRequest({ method: 'POST', url: '/api/posts', data: formData });
    };

    const handleToggleDropComponent = () => setIsUploadActive((prevState) => !prevState);
    const handleCloseDropComponent = () => setIsUploadActive(false);

    if (state.status === 'SUCCESS') return <Success />;

    return (
        <Formik
            initialValues={{ content: '', images: [] }}
            validationSchema={PostSchema}
            onSubmit={(values) => createPost(values)}
        >
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
                            handleClose={handleCloseDropComponent}
                        />
                    )}

                    <Errors state={state} />

                    <div className="w-full p-3">
                        <div className="w-full flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
                            <span className="text-light-200 font-medium">Add to your post</span>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={handleToggleDropComponent}
                                >
                                    <FontAwesomeIcon icon={faImages} className="text-2xl text-green-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pb-4 px-4">
                        <Button
                            type="submit"
                            title="Create post"
                            isDisabled={state.status === 'LOADING'}
                            styles="w-full"
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
};
