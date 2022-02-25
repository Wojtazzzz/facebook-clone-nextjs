import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ButtonOverlay } from '@components/chat/shared/ButtonOverlay';

import { SendMessageSchema } from '@validation/SendMessageSchema';

interface SendMessageProps {}

export const SendMessage: React.FC<SendMessageProps> = () => {
	const [isMessagePrepared, setIsMessagePrepared] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSendEmoji = () => alert('Maybe in the future...');

	const handleChangeMessage = (event: React.FormEvent<HTMLInputElement>, formikHandleChange: () => void) => {
		formikHandleChange();

		setIsMessagePrepared(event.currentTarget.value.length > 0);
	};

	const handleSendMessage = (message: string) => {
		console.log('Send message: ', message);
	};

	return (
		<Formik
			initialValues={{ message: '' }}
			validationSchema={SendMessageSchema}
			onSubmit={(values, { resetForm }) => {
				resetForm();
				handleSendMessage(values.message);
			}}>
			{({ values, handleChange, handleBlur, handleSubmit }) => (
				<form onSubmit={handleSubmit} className="flex items-center gap-2">
					<input
						ref={inputRef}
						type="text"
						name="message"
						placeholder="Aa"
						value={values.message}
						onChange={event => handleChangeMessage(event, () => handleChange(event))}
						onBlur={handleBlur}
						autoComplete="off"
						className={`${isMessagePrepared ? 'w-52' : 'w-36'} h-9 bg-dark-100 text-light-100 transition-width focus:outline-none rounded-[20px] px-3`}
					/>

					{isMessagePrepared ? (
						<ButtonOverlay type="submit" callback={handleSubmit}>
							<FontAwesomeIcon icon={faCircleCheck} />
						</ButtonOverlay>
					) : (
						<ButtonOverlay callback={handleSendEmoji}>
							<FontAwesomeIcon icon={faThumbsUp} />
						</ButtonOverlay>
					)}
				</form>
			)}
		</Formik>
	);
};
