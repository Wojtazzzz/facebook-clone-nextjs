import { SendMessageSchema } from '@validation/SendMessageSchema';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import type { IChatMessagePayload } from '@utils/types';
import { useCreateMessage } from './useCreateMessage';
import { AddImages } from './addImages/AddImages';
import { Content } from './content/Content';
import { SubmitButton } from './SubmitButton';

export const CreateMessage = () => {
    const { sendMessage } = useCreateMessage();

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
                <AddImages />

                <div className="flex items-end gap-1 ml-auto">
                    <Content />
                    <SubmitButton />
                </div>
            </Form>
        </Formik>
    );
};

type IHandleSendMessage = (data: IChatMessagePayload, actions: FormikHelpers<IChatMessagePayload>) => void;

const initialValues: IChatMessagePayload = {
    content: '',
    images: [],
};
