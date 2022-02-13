import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import Link from 'next/link';
import { Formik } from 'formik';
import { Input } from '@components/auth/Input';
import { Button } from '@components/Button';
import { SmallLogo } from '@components/SmallLogo';
import { RequestErrors } from '@components/auth/RequestErrors';

import { LoginSchema } from '@validation/LoginSchema';

import type { NextPage } from 'next';
import { GuestLayout } from '@components/layouts/GuestLayout';
import { AuthMiddleware } from '@enums/AuthMiddleware';


const Login: NextPage = () => {
    const [requestErrors, setRequestErrors] = useState([]);
    const { login, isRequestLoading } = useAuth({ middleware: AuthMiddleware.GUEST });

    const handleSubmit = (email: string, password: string) => {
        login({
            email,
            password,
            setErrors: setRequestErrors
        })
    }

    return (
        <GuestLayout>
            <div className="flex flex-col md:flex-row justify-center gap-16">
                <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-4 mb-5">
                        <SmallLogo />
                        <h1 className="text-4xl md:text-5xl text-primary font-bold">Facebook</h1>
                    </div>

                    <span className="md:text-lg text-light-100 font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus velit explicabo aut corrupti tenetur nemo hic, veritatis, molestias, iure minima maiores voluptatibus magnam officiis quae quia modi fugit quod quibusdam?
                    </span>
                </div>

                <div className="w-full md:w-1/2 max-w-[400px] bg-dark-200 rounded-lg shadow-md p-4 md:p-5 lg:p-7">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={({ email, password }, { setSubmitting }) => handleSubmit(email, password, setSubmitting)}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                                <p className="text-xl text-light-100 font-bold">LOGIN</p>

                                <Input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    placeholder="Adres e-mail"
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

                                <RequestErrors errors={requestErrors} />

                                <Button
                                    type="submit"
                                    title="Login"
                                    styles="text-xl"
                                    isDisabled={isRequestLoading}
                                    callback={handleSubmit}
                                />
                            </form>
                        )}
                    </Formik>

                    <hr className="h-px block border-0 bg-dark-100 mt-7 mb-3" />

                    <div className="text-center">
                        <Link href="/register">
                            <a className="text-sm text-light-200 hover:underline">
                                Don&apos;t have an account? <br /> Register
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login;
