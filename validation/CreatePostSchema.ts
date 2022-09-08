import * as Yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/svg', 'image/webp'];

function checkIfFilesAreTooBig(files?: File[]) {
    let valid = true;

    if (files) {
        files.forEach((file) => {
            const size = file.size / 1024 / 1024;

            if (size > 10) {
                valid = false;
            }
        });
    }

    return valid;
}

function checkIfFilesAreCorrectType(files?: File[]) {
    let valid = true;

    if (files) {
        files.forEach((file) => {
            if (!SUPPORTED_FORMATS.includes(file.type)) {
                valid = false;
            }
        });
    }

    return valid;
}

export const CreatePostSchema = Yup.object().shape(
    {
        content: Yup.string()
            .nullable()
            .when('images', {
                is: (images?: []) => (images?.length ?? 0) <= 0,
                then: Yup.string().required('Post must contain text or image(s)'),
            })
            .min(2, 'Post must be at least 2 characters')
            .max(1000, 'Post must be at most 1000 characters'),

        images: Yup.mixed()
            .nullable()
            .when('content', {
                is: (content: string | undefined) => content && content.length <= 0,
                then: Yup.mixed().required(),
            })
            .test('is-big-file', 'Uploaded image is too big', checkIfFilesAreTooBig)
            .test('is-correct-type-file', 'Uploaded image has wrong type', checkIfFilesAreCorrectType),
    },
    [['content', 'images']]
);
