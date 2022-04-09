import { Auth } from '@components/auth/Auth';
import { render, screen } from '@testing-library/react';

describe('Auth component', () => {
    it('renders login as default form', () => {
        render(<Auth />);

        screen.getByText('Login');
    });

    it('redirects between forms', () => {
        render(<Auth />);

        const redirectToRegisterFormElement = screen.getByText((content) =>
            content.startsWith("Don't have an account?"),
        );
        redirectToRegisterFormElement.click();

        screen.getByText('Register');

        const redirectToLoginFormElement = screen.getByText((content) => content.startsWith('Have an account?'));
        redirectToLoginFormElement.click();

        screen.getByText('Login');
    });

    it('has link to original facebook app', () => {
        render(<Auth />);

        expect(screen.getByTestId('informations-facebook_link')).toHaveAttribute('href', 'https://facebook.com/');
    });
});
