import * as Yup from 'yup';
import { SUPPORTED_FORMATS } from '@utils/supportedImagesFormats';

const checkIfFilesAreTooBig = (files: unknown) => {
    if (!files || !Array.isArray(files)) {
        return false;
    }

    files.forEach((file) => {
        const size = file.size / 1024 / 1024;

        if (size > 10) {
            return false;
        }
    });

    return true;
};

const checkIfFilesAreCorrectType = (files: unknown) => {
    if (!files || !Array.isArray(files)) {
        return false;
    }

    files.forEach((file) => {
        if (!SUPPORTED_FORMATS.includes(file.type)) {
            return false;
        }
    });

    return true;
};

const isContent = () => {
    (images?: File[], imagesToDelete?: string[]) => {
        const hasUploadedMessages = (images?.length ?? 0) > 0;
        const hasImagesToDelete = (imagesToDelete?.length ?? 0) > 0;

        return !hasUploadedMessages && !hasImagesToDelete;
    };
};

export const UpdatePostSchema = Yup.object().shape(
    {
        content: Yup.string()
            .nullable()
            .when(['images', 'imagesToDelete'], {
                is: isContent,
                then: (schema) => schema.required('Post must contain text or image(s)'),
            })
            .min(2, 'Post must be at least 2 characters')
            .max(1000, 'Post must be at most 1000 characters'),

        images: Yup.mixed()
            .nullable()
            .when('content', {
                is: (content: string | undefined) => content && content.length <= 0,
                then: (schema) => schema.required(),
            })
            .test('is-big-file', 'Uploaded image is too big', checkIfFilesAreTooBig)
            .test('is-correct-type-file', 'Uploaded image has wrong type', checkIfFilesAreCorrectType),

        imagesToDelete: Yup.mixed().nullable(),
    },
    [['content', 'images']]
);
