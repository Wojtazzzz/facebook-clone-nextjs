import { LoginForm } from '@components/auth/LoginForm';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('LoginForm component', () => {
    it('renders email, password and button input', () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent('Login');
    });

    it('displays "required" validation message when input values are empty', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        await act(async () => {
            submitButton.click();
        });

        const emailErrorMessage = screen.getByText('Email field is required');
        const passwordErrorMessage = screen.getByText('Password field is required');

        expect(emailErrorMessage).toBeInTheDocument();
        expect(passwordErrorMessage).toBeInTheDocument();
    });

    it('displays "incorrect email" validation message when email is invalid', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        fireEvent.change(emailInput, { target: { value: 'incorrect_email' } });

        await act(async () => {
            submitButton.click();
        });

        const emailErrorMessage = screen.getByText('Email is invalid');

        expect(emailErrorMessage).toBeInTheDocument();
    });
});
