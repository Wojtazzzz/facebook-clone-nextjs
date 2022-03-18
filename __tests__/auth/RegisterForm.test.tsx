import { render } from '@testing-library/react';

import { RegisterForm } from '@components/auth/RegisterForm';

describe('Register Form', () => {
	it('Check inputs are disabled', () => {
		const { getByLabelText } = render(<RegisterForm />);

		const inputFirstName = getByLabelText('First name');
		const inputLastName = getByLabelText('Last name');
		const inputEmail = getByLabelText('Address e-mail');
		const inputPassword = getByLabelText('Password');
		const inputPasswordConfirmaiton = getByLabelText('Password confirmation');

		expect(inputFirstName).toBeDisabled();
		expect(inputLastName).toBeDisabled();
		expect(inputEmail).toBeDisabled();
		expect(inputPassword).toBeDisabled();
		expect(inputPasswordConfirmaiton).toBeDisabled();
	});

	it('Check form button is disabled', () => {
		const { getByText } = render(<RegisterForm />);

		const button = getByText('Register');

		expect(button).toBeDisabled();
	});
});
