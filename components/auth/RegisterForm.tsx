import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/auth/Input';
import { Button } from '@components/Button';
import { RequestErrors } from '@components/auth/RequestErrors';


export const RegisterForm: React.FC = () => {
    const { register, isRequestLoading } = useAuth();
    const [requestErrors, setRequestErrors] = useState([]);

    const handleCreateAccount = () => register({ setErrors: setRequestErrors });

    return (
        <form
            onSubmit={handleCreateAccount}
            className="w-full flex flex-col gap-6"
        >
            <p className="text-xl text-light-100 font-bold">REGISTER</p>

            <Input
                type="text"
                name="first_name"
                value=""
                placeholder="First name"
                isDisabled
            />

            <Input
                type="text"
                name="last_name"
                value=""
                placeholder="Last name"
                isDisabled
            />

            <Input
                type="email"
                name="email"
                value=""
                placeholder="Address e-mail"
                isDisabled
            />

            <Input
                type="password"
                name="password"
                value=""
                placeholder="Password"
                isDisabled
            />

            <Input
                type="password"
                name="password_confirmation"
                value=""
                placeholder="Password confirmation"
                isDisabled
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
    );
}