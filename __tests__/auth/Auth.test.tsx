import { Auth } from '@components/pages/auth/Auth';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import nock from 'nock';

describe('Auth component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
        mock('/api/user', 401);
    });

    it('renders login as default form', () => {
        renderWithDefaultData(<Auth />);

        const loginHeader = screen.getByText('Login');

        expect(loginHeader).toBeInTheDocument();
    });

    it('redirects between forms', () => {
        renderWithDefaultData(<Auth />);

        const redirectToRegisterFormElement = screen.getByText((content) =>
            content.startsWith("Don't have an account?")
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
        renderWithDefaultData(<Auth />);

        const link = screen.getByTestId('informations-facebook_link');

        expect(link).toHaveAttribute('href', 'https://facebook.com/');
    });
});
