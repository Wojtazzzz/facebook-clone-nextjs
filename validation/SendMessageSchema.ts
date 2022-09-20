import * as Yup from 'yup';
import { checkFilesAreTooBig } from '@utils/checkFilesAreTooBig';
import { checkFilesHaveCorrectType } from '@utils/checkFilesHaveCorrectType';

export const SendMessageSchema = Yup.object().shape(
    {
        content: Yup.string()
            .nullable()
            .when('images', {
                is: (images?: File[]) => (images?.length ?? 0) <= 0,
                then: (schema) => schema.required('Post must contain text or image(s)'),
            })
            .max(200),

        images: Yup.mixed()
            .nullable()
            .when('content', {
                is: (content: string | undefined) => content && content.length <= 0,
                then: (schema) => schema.required(),
            })
            .test('is-big-file', 'Uploaded image is too big', checkFilesAreTooBig)
            .test('is-correct-type-file', 'Uploaded image has wrong type', checkFilesHaveCorrectType),
    },
    [['content', 'images']]
);
