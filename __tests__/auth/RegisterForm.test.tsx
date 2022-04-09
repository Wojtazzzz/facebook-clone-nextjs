import { RegisterForm } from '@components/auth/RegisterForm';
import { render, screen } from '@testing-library/react';

describe('RegisterForm component', () => {
    it('checks for all inputs are disabled', () => {
        render(<RegisterForm />);

        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');
        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const passwordConfirmationInput = screen.getByLabelText('Password confirmation');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        [firstNameInput, lastNameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton].forEach(
            (element) => expect(element).toBeDisabled(),
        );
    });

    it('check for Create Random User button is not disabled', () => {
        render(<RegisterForm />);

        const createRandomUserButton = screen.getByRole('button', { name: 'Create Random User' });

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
