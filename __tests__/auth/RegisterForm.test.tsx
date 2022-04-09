import { RegisterForm } from '@components/auth/RegisterForm';
import { render, screen } from '@testing-library/react';

describe('RegisterForm component', () => {
    it('checks for all inputs are disabled', () => {
        render(<RegisterForm />);

        const firstNameInput = screen.getByPlaceholderText('First name');
        const lastNameInput = screen.getByPlaceholderText('Last name');
        const emailInput = screen.getByPlaceholderText('Address e-mail');
        const passwordInput = screen.getByPlaceholderText('Password');
        const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        expect(firstNameInput).toBeDisabled();
        expect(lastNameInput).toBeDisabled();
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();
        expect(passwordConfirmationInput).toBeDisabled();
        expect(submitButton).toBeDisabled();
    });

    it('check for Create Random User button is not disabled', () => {
        render(<RegisterForm />);

        const createRandomUserButton = screen.getByRole('button', { name: 'Create Random User' });

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
