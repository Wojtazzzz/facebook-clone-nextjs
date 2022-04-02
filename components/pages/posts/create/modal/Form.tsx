import * as React from 'react';import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';

import type { CreatePostPayload } from '@ctypes/forms/CreatePostPayload';

interface FormProps {
	createPost: (data: CreatePostPayload) => void;
}

export const Form = ({ createPost }: FormProps) => {
	const [isUploadActive, setIsUploadActive] = useState(false);
	const { user } = useAuth();

	if (!user) return <></>;

	return (
		<Formik initialValues={{ content: '', images: [] }} onSubmit={values => createPost(values)}>
			{({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
					<div className="w-full p-4">
						<div className="flex gap-3 mb-1">
							<Avatar src={user.profile_image} size="40" alt={`${user.first_name} profile image`} />

							<span className="text-sm text-light-100 font-bold mt-1">{user.name}</span>
						</div>

						<div className="w-full">
							<textarea
								name="content"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.content}
								placeholder={`What's on your mind, ${user.first_name}?`}
								className="w-full text-lg text-light-100 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-dark-200 p-3"
							></textarea>
						</div>
					</div>

					{isUploadActive && (
						<Dropzone
							accept="image/*"
							onDrop={acceptedFiles => {
								setFieldValue('images', [...values.images, ...acceptedFiles]);
							}}
						>
							{({ isDragActive, isDragReject, getRootProps, getInputProps }) => {
								if (isDragActive) {
									return <span>This file is authorized</span>;
								}

								if (isDragReject) {
									return <span>This file is not authorized</span>;
								}

								return (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<p>Drag n drop some files here, or click to select files</p>
										</div>
									</section>
								);
							}}
						</Dropzone>
					)}

					<div className="w-full p-3">
						<div className="w-full flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
							<span className="text-light-200 font-medium">Add to your post</span>

							<div className="flex gap-2">
								<button
									type="button"
									className="focus:outline-none"
									onClick={() => setIsUploadActive(prevState => !prevState)}
								>
									<FontAwesomeIcon icon={faImages} className="text-2xl text-green-400" />
								</button>
							</div>
						</div>
					</div>

					<div className="p-4 pt-0">
						<Button type="submit" title="Post" styles="w-full" />
					</div>
				</form>
			)}
		</Formik>
	);
};
