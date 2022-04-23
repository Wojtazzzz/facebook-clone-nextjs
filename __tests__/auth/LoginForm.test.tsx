import { LoginForm } from '@components/auth/LoginForm';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { render, screen, fireEvent } from '@testing-library/react';
import nock from 'nock';

describe('LoginForm component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/user').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/user').reply(401);
    });

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

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        const submitButton = screen.getByRole('button');

        submitButton.click();

        const emailErrorMessage = await screen.findByText('Email field is required');
        const passwordErrorMessage = await screen.findByText('Password field is required');

        expect(emailErrorMessage).toBeInTheDocument();
        expect(passwordErrorMessage).toBeInTheDocument();
    });

    it('displays "incorrect email" validation message when email is invalid', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        fireEvent.change(emailInput, { target: { value: 'incorrect_email' } });

        submitButton.click();

        const emailErrorMessage = await screen.findByText('Email is invalid');

        expect(emailErrorMessage).toBeInTheDocument();
    });
});
