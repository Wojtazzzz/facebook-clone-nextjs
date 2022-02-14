import * as React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GuestLayout } from '@components/layouts/GuestLayout';
import { LoginForm } from '@components/auth/LoginForm';
import { RegisterForm } from '@components/auth/RegisterForm';
import { SmallLogo } from '@components/SmallLogo';

import type { NextPage } from 'next';


const Login: NextPage = () => {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);

    const handleToggleIsLoginFomActive = () => setIsLoginFormActive(prevState => !prevState);

    return (
        <GuestLayout>
            <div className="flex flex-col md:flex-row justify-center gap-16">
                <div className="w-full md:w-1/2 md:pt-8">
                    <div className="flex items-center gap-4 mb-5">
                        <SmallLogo />
                        <h1 className="text-4xl md:text-5xl text-primary font-bold">Facebook</h1>
                    </div>

                    <span className="md:text-lg text-light-100 font-medium">
                        Welcome to Facebook-clone app! This is non-commercial and nonofficial version of <a href="https://facebook.com/" className="text-primary hover:underline">Facebook</a> similar social app.
                        For safety you cannot create account with own credentials. Instead of you can create free account with random data.
                        All this accounts will be deleted after 10 days. Enjoy!
                    </span>

                    <div className="mt-10">
                        <Link href="https://github.com/CubeStorm">
                            <a target="_blank" rel="noopener noreferrer" className="w-24 h-24 flex justify-center items-center text-light-100 hover:text-light-200 border-2 border-light-100 hover:border-light-200 rounded-md transition-colors">
                                <FontAwesomeIcon
                                    className="text-5xl"
                                    icon={faGithub}
                                />
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 max-w-[400px] bg-dark-200 rounded-lg shadow-md p-4 md:p-5 lg:p-7">
                    {isLoginFormActive
                        ? <LoginForm />
                        : <RegisterForm />
                    }

                    <hr className="h-px block border-0 bg-dark-100 mt-7 mb-3" />

                    <div
                        className="text-center cursor-pointer"
                        onClick={handleToggleIsLoginFomActive}
                    >
                        <span className="text-sm text-light-200 hover:underline">
                            {isLoginFormActive
                                ? <> Don&apos;t have an account? <br /> Register </>
                                : <> Have an account? <br /> Login </>}
                        </span>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login;
