import { Register } from '@components/pages/auth/authorization/register/Register';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import nock from 'nock';

describe('Register component', () => {
    beforeEach(() => {
        nock.disableNetConnect();

        mock('/api/user', 401);
    });

    it('check all inputs are disabled', () => {
        renderWithDefaultData(<Register />);

        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');
        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const passwordConfirmationInput = screen.getByLabelText('Password confirmation');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        [firstNameInput, lastNameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton].forEach(
            (element) => expect(element).toBeDisabled()
        );
    });

    it('check for create random user button is not disabled', () => {
        renderWithDefaultData(<Register />);

        const createRandomUserButton = screen.getByRole('button', { name: 'Create Random User' });

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
