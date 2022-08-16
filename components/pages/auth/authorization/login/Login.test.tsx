import { Login } from '@components/pages/auth/authorization/login/Login';
import CannotLoginResponse from '@mocks/user/cannotLogin.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Login component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            status: 401,
        });
    });

    it('render email, password and button input', () => {
        renderWithDefaultData(<Login />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('display "required" validation message when input values are empty', async () => {
        renderWithDefaultData(<Login />);

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

    it('display "incorrect email" validation message when email is invalid', async () => {
        renderWithDefaultData(<Login />);

        const emailInput = screen.getByLabelText('Address e-mail');
        const submitButton = screen.getByRole('button');

        await user.type(emailInput, 'incorrect_email');
        await user.click(submitButton);

        const emailErrorMessage = await screen.findByText('Email is invalid');

        expect(emailErrorMessage).toBeInTheDocument();
    });

    it('display "incorrect credentials" message when login response returns 422 error', async () => {
        mock({
            path: '/api/csrf-cookie',
            status: 204,
        });

        mock({
            path: '/login',
            status: 422,
            data: CannotLoginResponse,
            method: 'post',
        });

        renderWithDefaultData(<Login />);

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
