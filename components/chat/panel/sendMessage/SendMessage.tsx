import { useEffect } from 'react';
import { useChat } from '@hooks/useChat';

import { Form, Formik } from 'formik';
import { Input } from '@components/chat/panel/sendMessage/Input';
import { SubmitButton } from '@components/chat/panel/sendMessage/SubmitButton';
import { SendLikeButton } from '@components/chat/panel/sendMessage/SendLikeButton';

import { SendMessageSchema } from '@validation/SendMessageSchema';

import type { FormikHelpers } from 'formik';

type MessageForm = {
    text: string;
};

export const SendMessage = () => {
    const { state, sendMessage } = useChat();

    useEffect(() => {
        if (state.status === 'ERROR') {
            alert('Something went wrong during sending message process');
        }
    }, [state]);

    const handleSendMessage = ({ text }: MessageForm, { resetForm }: FormikHelpers<MessageForm>) => {
        sendMessage(text);
        resetForm();
    };

    return (
        <Formik initialValues={{ text: '' }} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            {({ values, handleSubmit }) => (
                <Form data-testid="sendMessage-form" className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <Input />

                    {!!values.text.length ? <SubmitButton /> : <SendLikeButton />}
                </Form>
            )}
        </Formik>
    );
};
