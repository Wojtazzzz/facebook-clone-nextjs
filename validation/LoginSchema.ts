import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email field is required'),

    password: Yup.string().required('Password field is required'),
});
