import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { Formik } from 'formik';
import { Input } from '@components/auth/Input';
import { Button } from '@components/Button';
import { RequestErrors } from '@components/auth/RequestErrors';


export const RegisterForm: React.FC = () => {
    const [requestErrors, setRequestErrors] = useState([]);
    const { register, isRequestLoading } = useAuth();

    const handleCreateAccount = () => register({ setErrors: setRequestErrors });

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            onSubmit={handleCreateAccount}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <p className="text-xl text-light-100 font-bold">REGISTER</p>

                    <Input
                        type="text"
                        name="first_name"
                        value={values.firstName}
                        placeholder="First name"
                        isDisabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Input
                        type="text"
                        name="last_name"
                        value={values.firstName}
                        placeholder="Last name"
                        isDisabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Input
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Adres e-mail"
                        isDisabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        isDisabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <RequestErrors errors={requestErrors} />

                    <Button
                        type="button"
                        title="Register"
                        isDisabled={true}
                        styles="w-full mt-3"
                    />

                    <Button
                        title="Create Random User"
                        isDisabled={isRequestLoading}
                        callback={handleCreateAccount}
                        styles="w-full mt-4"
                    />
                </form>
            )}
        </Formik>
    );
}