import { Input } from './Input';
import { ResponseError } from '@components/pages/auth/authorization/inc/ResponseError';
import { Button } from '@components/inc/Button';
import { useRegister } from './useRegister';

export const Register = () => {
    const { register, isLoading, error } = useRegister();

    return (
        <form className="w-full flex flex-col gap-3" onSubmit={register}>
            <p className="text-light-100 font-bold">REGISTER</p>

            <div className="flex flex-col gap-4">
                <Input type="text" label="First name" name="first_name" />
                <Input type="text" label="Last name" name="last_name" />
                <Input type="email" label="Email" name="email" />
                <Input type="password" label="Password" name="password" />
                <Input type="password" label="Confirm password" name="password_confirmation" />

                <Button type="button" title="Register" isDisabled={true} styles="w-full mt-2" />
            </div>

            <Button title="Create random user" isLoading={isLoading} callback={register} styles="w-full mt-2" />

            <ResponseError error={error} />
        </form>
    );
};
