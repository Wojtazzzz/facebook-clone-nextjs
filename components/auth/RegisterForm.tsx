import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { Input } from '@components/auth/shared/Input';
import { RequestErrors } from '@components/auth/shared/RequestErrors';
import { Button } from '@components/Button';

export const RegisterForm = () => {
	const { register, isLoading, errors } = useAuth();

	const handleCreateAccount = () => register();

	return (
		<form onSubmit={handleCreateAccount} className="w-full flex flex-col gap-6">
			<p className="text-xl text-light-100 font-bold">REGISTER</p>

			<Input type="text" name="first_name" placeholder="First name" isDisabled />

			<Input type="text" name="last_name" placeholder="Last name" isDisabled />

			<Input type="email" name="email" placeholder="Address e-mail" isDisabled />

			<Input type="password" name="password" placeholder="Password" isDisabled />

			<Input type="password" name="password_confirmation" placeholder="Password confirmation" isDisabled />

			{!!errors.length && <RequestErrors errors={errors} />}

			<Button type="button" title="Register" isDisabled={true} styles="w-full mt-3" />

			<Button
				title="Create Random User"
				isDisabled={isLoading}
				callback={handleCreateAccount}
				styles="w-full mt-4"
			/>
		</form>
	);
};
