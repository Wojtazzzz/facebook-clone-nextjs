import { useAuth } from '@hooks/useAuth';

import { Form, Formik } from 'formik';
import { Input } from '@components/pages/auth/inc/Input';
import { ErrorMessage } from '@components/pages/auth/inc/ErrorMessage';
import { Button } from '@components/inc/Button';

import { LoginSchema } from '@validation/LoginSchema';

import type { ILoginPayload } from '@utils/types';

export const LoginForm = () => {
    const { useLogin } = useAuth();
    const { login, isLoading, isError, errorMessage } = useLogin();

    const handleSubmit = (data: ILoginPayload) => login(data);

    return (
        <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    <p className="text-xl text-light-100 font-bold">LOGIN</p>

                    <Input
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Address e-mail"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Button
                        type="submit"
                        title="Login"
                        isDisabled={isLoading}
                        callback={handleSubmit}
                        styles="w-full mt-4"
                    />

                    <ErrorMessage isError={isError} message={errorMessage} />
                </Form>
            )}
        </Formik>
    );
};
