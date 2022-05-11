import * as Yup from 'yup';

export const CommentSchema = Yup.object().shape({
    content: Yup.string()
        .min(2, 'Comment must be at least 2 characters')
        .max(8000, 'Comment must be at most 8000 characters')
        .required('Comment must contain text'),

    resource_id: Yup.number().required('First of all choose resource to comment'),
});
