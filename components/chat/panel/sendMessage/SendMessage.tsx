import { useChat } from '@hooks/useChat';
import { Form, Formik } from 'formik';
import { Input } from '@components/chat/panel/sendMessage/Input';
import { Button } from '@components/chat/panel/sendMessage/button/Button';
import { SendMessageSchema } from '@validation/SendMessageSchema';
import type { FormikHelpers } from 'formik';
import type { IChatMessagePayload } from '@utils/types';

export const SendMessage = () => {
    const { sendMessage } = useChat();

    const handleSendMessage: IHandleSendMessage = ({ text }, { resetForm }) => {
        sendMessage(text);
        resetForm();
    };

    return (
        <Formik initialValues={{ text: '' }} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            <Form data-testid="sendMessage-form" className="flex items-center gap-2">
                <Input />
                <Button />
            </Form>
        </Formik>
    );
};

type IHandleSendMessage = (data: IChatMessagePayload, actions: FormikHelpers<IChatMessagePayload>) => void;
