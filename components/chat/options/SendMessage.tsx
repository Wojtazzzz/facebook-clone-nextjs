import { useState, useEffect, useLayoutEffect, useRef, memo, FormEvent } from 'react';
import { useAxios } from '@hooks/useAxios';

import { Formik, FormikHelpers } from 'formik';
import { faCircleCheck, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

import { SendMessageSchema } from '@validation/SendMessageSchema';
import { useAppSelector } from '@hooks/redux';
import { clsx } from 'clsx';

interface FormValues {
    text: string;
}

export const SendMessage = memo(() => {
    const { friend } = useAppSelector((state) => state.chat);
    const [isMessagePrepared, setIsMessagePrepared] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { state, sendRequest } = useAxios();

    useLayoutEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (state.status === 'ERROR') {
            alert('Something went wrong during sending message process');
        }
    }, [state]);

    const handleSendLike = () => alert('Maybe in the future...');

    const handleChangeMessage = (event: FormEvent<HTMLInputElement>, formikHandleChange: () => void) => {
        formikHandleChange();

        setIsMessagePrepared(!!event.currentTarget.value.length);
    };

    const handleSendMessage = ({ text }: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        sendRequest({
            method: 'POST',
            url: '/api/messages',
            data: { text, receiver_id: friend?.id },
        });

        resetForm();
        setIsMessagePrepared(false);
    };

    return (
        <Formik initialValues={{ text: '' }} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form data-testid="sendMessage-form" className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        aria-label="Message input"
                        type="text"
                        name="text"
                        placeholder="Aa"
                        value={values.text}
                        autoComplete="off"
                        className={clsx(
                            'h-9 bg-dark-100 text-light-100 transition-width focus:outline-none rounded-[20px] px-3',
                            isMessagePrepared && 'w-52',
                            !isMessagePrepared && 'w-36'
                        )}
                        onChange={(event) => handleChangeMessage(event, () => handleChange(event))}
                        onBlur={handleBlur}
                    />

                    {isMessagePrepared ? (
                        <RoundedButton
                            type="submit"
                            name="Send message"
                            icon={faCircleCheck}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={handleSubmit}
                        />
                    ) : (
                        <RoundedButton
                            name="Send like"
                            icon={faThumbsUp}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={handleSendLike}
                        />
                    )}
                </form>
            )}
        </Formik>
    );
});

SendMessage.displayName = 'SendMessages';
