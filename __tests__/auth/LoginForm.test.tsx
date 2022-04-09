import { LoginForm } from '@components/auth/LoginForm';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('LoginForm component', () => {
    it('renders email, password and button input', () => {
        render(<LoginForm />);

        screen.getByLabelText('Address e-mail');
        screen.getByLabelText('Password');
        expect(screen.getByRole('button')).toHaveTextContent('Login');
    });

    it('displays "required" validation message when input values are empty', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        await act(async () => {
            fireEvent.click(submitButton);
        });

        screen.getByText('Email field is required');
        screen.getByText('Password field is required');
    });

    it('displays "incorrect email" validation message when email is invalid', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        fireEvent.change(emailInput, { target: { value: 'incorrect_email' } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        screen.getByText('Email is invalid');
    });
});
