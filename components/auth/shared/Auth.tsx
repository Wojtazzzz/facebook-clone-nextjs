import * as React from 'react';
import { useState } from 'react';

import { LoginForm } from '@components/auth/LoginForm';
import { RegisterForm } from '@components/auth/RegisterForm';

export const Auth: React.FC = () => {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);

    const handleToggleIsLoginFormActive = () => setIsLoginFormActive(prevState => !prevState);

    return (
        <div className="w-full md:w-1/2 max-w-[400px] bg-dark-200 rounded-lg shadow-md p-4 md:p-5 lg:p-7">
            {isLoginFormActive
                ? <LoginForm />
                : <RegisterForm />}

            <hr className="h-px block border-0 bg-dark-100 mt-7 mb-3" />

            <div
                className="text-center cursor-pointer"
                onClick={handleToggleIsLoginFormActive}
            >
                <span className="text-sm text-light-200 hover:underline">
                    {isLoginFormActive
                        ? <> Don&apos;t have an account? <br /> Register </>
                        : <> Have an account? <br /> Login </>}
                </span>
            </div>
        </div>
    );
}