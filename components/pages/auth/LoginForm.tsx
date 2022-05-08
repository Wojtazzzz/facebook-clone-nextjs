import { useAuth } from '@hooks/useAuth';

import { Formik } from 'formik';
import { Input } from '@components/pages/auth/inc/Input';
import { RequestErrors } from '@components/pages/auth/inc/RequestErrors';
import { Button } from '@components/inc/Button';

import { LoginSchema } from '@validation/LoginSchema';

import type { LoginPayload } from '@ctypes/forms/LoginPayload';

export const LoginForm = () => {
    const { login, isLoading, error } = useAuth();

    const handleSubmit = (data: LoginPayload) => login(data);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
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

                    {error && <RequestErrors error={error} />}
                </form>
            )}
        </Formik>
    );
};
