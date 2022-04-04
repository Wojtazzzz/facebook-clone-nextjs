import { useState, useEffect, useRef, memo } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginationData } from '@hooks/usePaginationData';

import { Formik, FormikHelpers } from 'formik';
import { faCircleCheck, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/RoundedButton';

import { SendMessageSchema } from '@validation/SendMessageSchema';
import { StateStatus } from '@enums/StateStatus';
import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { Function } from '@ctypes/Function';

interface SendMessageProps {
    friendId: number;
}

interface FormValues {
    text: string;
}

export const SendMessage = memo<SendMessageProps>(({ friendId }) => {
    const [isMessagePrepared, setIsMessagePrepared] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { state, sendRequest } = useAxios();
    const { state: messagesState } = usePaginationData(`/api/messages/${friendId}`);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (state.status === StateStatus.ERROR) {
            alert('Something went wrong during sending message process');
        }
    }, [state]);

    const handleSendEmoji = () => alert('Maybe in the future...');

    const handleChangeMessage = (event: React.FormEvent<HTMLInputElement>, formikHandleChange: Function<void>) => {
        formikHandleChange();

        setIsMessagePrepared(!!event.currentTarget.value.length);
    };

    const handleSendMessage = ({ text }: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        sendRequest({
            method: 'POST',
            url: '/api/messages',
            data: { text, receiver_id: friendId },
        });

        resetForm();
        setIsMessagePrepared(false);
    };

    return (
        <Formik initialValues={{ text: '' }} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        name="text"
                        placeholder="Aa"
                        value={values.text}
                        disabled={messagesState === StatePaginationStatus.LOADING}
                        autoComplete="off"
                        className={`${
                            isMessagePrepared ? 'w-52' : 'w-36'
                        } h-9 bg-dark-100 text-light-100 transition-width focus:outline-none rounded-[20px] px-3`}
                        onChange={(event) => handleChangeMessage(event, () => handleChange(event))}
                        onBlur={handleBlur}
                    />

                    {isMessagePrepared ? (
                        <RoundedButton
                            name="Send text message"
                            icon={faCircleCheck}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={handleSubmit}
                        />
                    ) : (
                        <RoundedButton
                            name="Send emoji"
                            icon={faThumbsUp}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={handleSendEmoji}
                        />
                    )}
                </form>
            )}
        </Formik>
    );
});

SendMessage.displayName = 'SendMessages';
