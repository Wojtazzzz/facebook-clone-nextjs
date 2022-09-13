import { Register } from '@components/pages/auth/authorization/register/Register';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';

describe('Register component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            status: 401,
        });
    });

    it('check all inputs are disabled', () => {
        renderWithDefaultData(<Register />);

        const inputs = [
            screen.getByLabelText('First name'),
            screen.getByLabelText('Last name'),
            screen.getByLabelText('Email'),
            screen.getByLabelText('Password'),
            screen.getByLabelText('Confirm password'),
            screen.getByLabelText('Register'),
        ];

        inputs.forEach((input) => expect(input).toBeDisabled());
    });

    it('check for create random user button is not disabled', () => {
        renderWithDefaultData(<Register />);

        const createRandomUserButton = screen.getByLabelText('Create random user');

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
