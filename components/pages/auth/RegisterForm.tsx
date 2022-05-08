import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/pages/auth/inc/Input';
import { RequestErrors } from '@components/pages/auth/inc/RequestErrors';
import { Button } from '@components/inc/Button';

export const RegisterForm = () => {
    const { register, isLoading, error } = useAuth();

    const handleCreateAccount = () => register();

    return (
        <form onSubmit={handleCreateAccount} className="w-full flex flex-col gap-6">
            <p className="text-xl text-light-100 font-bold">REGISTER</p>

            <Input type="text" name="first_name" placeholder="First name" isDisabled />
            <Input type="text" name="last_name" placeholder="Last name" isDisabled />
            <Input type="email" name="email" placeholder="Address e-mail" isDisabled />
            <Input type="password" name="password" placeholder="Password" isDisabled />
            <Input type="password" name="password_confirmation" placeholder="Password confirmation" isDisabled />

            <Button type="button" title="Register" isDisabled={true} styles="w-full mt-2" />

            <Button title="Create Random User" isDisabled={isLoading} callback={handleCreateAccount} styles="w-full" />

            {error && <RequestErrors error={error} />}
        </form>
    );
};
