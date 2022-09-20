import { SendMessageSchema } from '@validation/SendMessageSchema';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import type { IChatMessagePayload } from '@utils/types';
import { useSendMessage } from './useSendMessage';
import { Images } from './images/Images';
import { Text } from './text/Text';

export const SendMessage = () => {
    const { sendMessage } = useSendMessage();

    const handleSendMessage: IHandleSendMessage = (data, { resetForm }) => {
        sendMessage(data);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={SendMessageSchema} onSubmit={handleSendMessage}>
            <Form
                data-testid="sendMessage-form"
                className="w-full h-[52px] flex justify-between items-end text-light-100 p-2"
            >
                <Images />
                <Text />
            </Form>
        </Formik>
    );
};

type IHandleSendMessage = (data: IChatMessagePayload, actions: FormikHelpers<IChatMessagePayload>) => void;

const initialValues: IChatMessagePayload = {
    content: '',
    images: [],
};
