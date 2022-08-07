import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/pages/auth/inc/Input';
import { ErrorMessage } from '@components/pages/auth/inc/ErrorMessage';
import { Button } from '@components/inc/Button';

export const RegisterForm = () => {
    const { useRegister } = useAuth();
    const { register, isLoading, isError, errorMessage } = useRegister();

    return (
        <form onSubmit={register} className="w-full flex flex-col gap-6">
            <p className="text-xl text-light-100 font-bold">REGISTER</p>

            <Input type="text" name="first_name" placeholder="First name" isDisabled />
            <Input type="text" name="last_name" placeholder="Last name" isDisabled />
            <Input type="email" name="email" placeholder="Address e-mail" isDisabled />
            <Input type="password" name="password" placeholder="Password" isDisabled />
            <Input type="password" name="password_confirmation" placeholder="Password confirmation" isDisabled />

            <Button type="button" title="Register" isDisabled={true} styles="w-full mt-2" />
            <Button title="Create Random User" isDisabled={isLoading} callback={register} styles="w-full" />

            <ErrorMessage isError={isError} message={errorMessage} />
        </form>
    );
};
