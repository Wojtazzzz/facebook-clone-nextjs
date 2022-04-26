import { useAuth } from '@hooks/useAuth';

import { Formik } from 'formik';
import { Input } from '@components/pages/auth/inc/Input';
import { RequestErrors } from '@components/pages/auth/inc/RequestErrors';
import { Button } from '@components/inc/Button';

import { LoginSchema } from '@validation/LoginSchema';

export const LoginForm = () => {
    const { login, isLoading, errors } = useAuth();

    const handleSubmit = (email: string, password: string) => login(email, password);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={({ email, password }) => handleSubmit(email, password)}
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

                    {!!errors.length && <RequestErrors errors={errors} />}

                    <Button
                        type="submit"
                        title="Login"
                        isDisabled={isLoading}
                        callback={handleSubmit}
                        styles="w-full mt-4"
                    />
                </form>
            )}
        </Formik>
    );
};
