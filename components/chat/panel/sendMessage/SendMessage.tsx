import { Form, Formik } from 'formik';
import { Input } from '@components/chat/panel/sendMessage/input/Input';
import { Button } from '@components/chat/panel/sendMessage/button/Button';
import { SendMessageSchema } from '@validation/SendMessageSchema';
import type { FormikHelpers } from 'formik';
import type { IChatMessagePayload } from '@utils/types';
import { useSendMessage } from './useSendMessage';

export const SendMessage = () => {
    const { sendMessage } = useSendMessage();

    const handleSendMessage: IHandleSendMessage = ({ content }, { resetForm }) => {
        sendMessage(content);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            <Form data-testid="sendMessage-form" className="flex items-center gap-2">
                <Input />
                <Button />
            </Form>
        </Formik>
    );
};

type IHandleSendMessage = (data: IChatMessagePayload, actions: FormikHelpers<IChatMessagePayload>) => void;

const initialValues = {
    content: '',
};
