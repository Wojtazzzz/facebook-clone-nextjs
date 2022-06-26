import { Form } from '@components/pages/auth/Form';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import nock from 'nock';

describe('Form component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        nock.disableNetConnect();
        mock('/api/user', 401);
    });

    it('renders login as default form', () => {
        renderWithDefaultData(<Form />);

        const loginHeader = screen.getByText('Login');

        expect(loginHeader).toBeInTheDocument();
    });

    it('redirects between forms', async () => {
        renderWithDefaultData(<Form />);

        const redirectToRegisterFormElement = screen.getByText((content) =>
            content.startsWith("Don't have an account?")
        );
        await user.click(redirectToRegisterFormElement);

        const registerModalHeader = screen.getByText('Register');

        expect(registerModalHeader).toBeInTheDocument();

        const redirectToLoginFormElement = screen.getByText((content) => content.startsWith('Have an account?'));
        await user.click(redirectToLoginFormElement);

        const loginModalHeader = screen.getByText('Login');

        expect(loginModalHeader).toBeInTheDocument();
    });
});
