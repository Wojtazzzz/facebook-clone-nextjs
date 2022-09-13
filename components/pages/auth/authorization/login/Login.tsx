import { Form, Formik } from 'formik';
import { Input } from './Input';
import { ResponseError } from '@components/pages/auth/authorization/inc/ResponseError';
import { LoginSchema } from '@validation/LoginSchema';
import { useLogin } from './useLogin';
import { SubmitButton } from './SubmitButton';
import type { ILoginPayload } from '@utils/types';

export const Login = () => {
    const { login, isLoading, error } = useLogin();

    return (
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={login}>
            <Form className="w-full flex flex-col gap-6">
                <span className="text-xl text-light-100 font-bold">LOGIN</span>

                <Input type="email" name="email" label="Email" isDisabled={isLoading} />
                <Input type="password" name="password" label="Password" isDisabled={isLoading} />

                <SubmitButton isDisabled={isLoading} />

                <ResponseError error={error} />
            </Form>
        </Formik>
    );
};

const initialValues: ILoginPayload = {
    email: '',
    password: '',
};
