import { LoginForm } from '@components/auth/LoginForm';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import CannotLoginResponse from '@mocks/user/cannotLogin.json';
import { render, screen } from '@testing-library/react';
import nock from 'nock';
import userEvent from '@testing-library/user-event';

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
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        const submitButton = screen.getByRole('button');

        await user.click(submitButton);

        const emailErrorMessage = await screen.findByText('Email field is required');
        const passwordErrorMessage = await screen.findByText('Password field is required');

        expect(emailErrorMessage).toBeInTheDocument();
        expect(passwordErrorMessage).toBeInTheDocument();
    });

    it('displays "incorrect email" validation message when email is invalid', async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        await user.type(emailInput, 'incorrect_email');
        await user.click(submitButton);

        const emailErrorMessage = await screen.findByText('Email is invalid');

        expect(emailErrorMessage).toBeInTheDocument();
    });

    it('displays "incorrect credentials" message when login response returns 401 error', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/sanctum/csrf-cookie').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/sanctum/csrf-cookie').reply(204);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/login').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/login').reply(422, CannotLoginResponse);

        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        await user.type(emailInput, 'incorrect_email@gmail.com');
        await user.type(passwordInput, 'incorrect_password');
        await user.click(submitButton);

        const errorHeader = await screen.findByText('Whoops! Something went wrong.');
        const error = await screen.findByText('These credentials do not match our records.');

        expect(errorHeader).toBeInTheDocument();
        expect(error).toBeVisible();
    });
});
