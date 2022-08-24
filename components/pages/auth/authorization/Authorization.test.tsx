import { Authorization } from '@components/pages/auth/authorization/Authorization';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';

describe('Authorization component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            status: 401,
        });
    });

    it('render login as default form', () => {
        renderWithDefaultData(<Authorization />);

        const loginHeader = screen.getByText('Login');

        expect(loginHeader).toBeInTheDocument();
    });

    it('can redirect between forms', async () => {
        renderWithDefaultData(<Authorization />);

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
