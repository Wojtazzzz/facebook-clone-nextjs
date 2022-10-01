import { Form, Formik } from 'formik';
import { Input } from './Input';
import { ResponseError } from '@components/pages/auth/authorization/inc/ResponseError';
import { LoginSchema } from './LoginSchema';
import { useLogin } from './useLogin';
import { SubmitButton } from './SubmitButton';
import type { ILoginPayload } from '@utils/types';

export const Login = () => {
    const { login, isLoading, error } = useLogin();

    return (
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={login}>
            <Form className="w-full flex flex-col gap-3">
                <p className="text-light-100 font-bold">LOGIN</p>

                <div className="flex flex-col gap-4">
                    <Input type="email" name="email" label="Email" isLoading={isLoading} />
                    <Input type="password" name="password" label="Password" isLoading={isLoading} />

                    <SubmitButton isLoading={isLoading} />
                </div>

                <ResponseError error={error} />
            </Form>
        </Formik>
    );
};

const initialValues: ILoginPayload = {
    email: '',
    password: '',
};
