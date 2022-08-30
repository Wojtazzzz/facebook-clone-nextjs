import * as Yup from 'yup';

export const SendMessageSchema = Yup.object().shape({
    content: Yup.string().required().max(200),
});
