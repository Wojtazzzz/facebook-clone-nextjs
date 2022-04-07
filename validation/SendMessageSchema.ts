import * as Yup from 'yup';

export const SendMessageSchema = Yup.object().shape({
    text: Yup.string().required().max(200),
});
