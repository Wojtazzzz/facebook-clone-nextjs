import { Auth } from '@components/auth/Auth';
import { render, screen } from '@testing-library/react';

describe('Auth component', () => {
    it('renders login as default form', () => {
        render(<Auth />);

        const loginHeader = screen.getByText('Login');

        expect(loginHeader).toBeInTheDocument();
    });

    it('redirects between forms', () => {
        render(<Auth />);

        const redirectToRegisterFormElement = screen.getByText((content) =>
            content.startsWith("Don't have an account?"),
        );
        redirectToRegisterFormElement.click();

        const registerModalHeader = screen.getByText('Register');

        expect(registerModalHeader).toBeInTheDocument();

        const redirectToLoginFormElement = screen.getByText((content) => content.startsWith('Have an account?'));
        redirectToLoginFormElement.click();

        const loginModalHeader = screen.getByText('Login');

        expect(loginModalHeader).toBeInTheDocument();
    });

    it('has link to original facebook app', () => {
        render(<Auth />);

        const link = screen.getByTestId('informations-facebook_link');

        expect(link).toHaveAttribute('href', 'https://facebook.com/');
    });
});
