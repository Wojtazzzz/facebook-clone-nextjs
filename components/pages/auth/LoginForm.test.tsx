import { LoginForm } from '@components/pages/auth/LoginForm';
import CannotLoginResponse from '@mocks/user/cannotLogin.json';
import { screen } from '@testing-library/react';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('LoginForm component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
        mock('/api/user', 401);
    });

    it('render email, password and button input', () => {
        renderWithDefaultData(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent('Login');
    });

    it('display "required" validation message when input values are empty', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        const submitButton = screen.getByRole('button');
        await user.click(submitButton);

        const emailError = await screen.findByText('Email field is required');
        const passwordError = await screen.findByText('Password field is required');

        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });

    it('displays "incorrect email" validation message when email is invalid', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        await user.type(emailInput, 'incorrect_email');
        await user.click(submitButton);

        const emailErrorMessage = await screen.findByText('Email is invalid');

        expect(emailErrorMessage).toBeInTheDocument();
    });

    it('displays "incorrect credentials" message when login response returns 401 error', async () => {
        mock('/sanctum/csrf-cookie', 204);
        mock('/login', 422, CannotLoginResponse, 'post');

        const user = userEvent.setup();

        renderWithDefaultData(<LoginForm />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        await user.type(emailInput, 'incorrect_email@gmail.com');
        await user.type(passwordInput, 'incorrect_password');
        await user.click(submitButton);

        const error = await screen.findByText('These credentials do not match our records.');

        expect(error).toBeInTheDocument();
    });
});
