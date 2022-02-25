import * as Yup from 'yup';

export const SendMessageSchema = Yup.object().shape({
	message: Yup.string().required(),
});
