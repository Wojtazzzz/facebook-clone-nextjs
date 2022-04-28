import { RegisterForm } from '@components/pages/auth/RegisterForm';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import nock from 'nock';

describe('RegisterForm component', () => {
    beforeEach(() => {
        nock.disableNetConnect();

        mock('/api/user', 401);
    });

    it('checks for all inputs are disabled', () => {
        renderWithDefaultData(<RegisterForm />);

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

    it('check for Create Random User button is not disabled', () => {
        renderWithDefaultData(<RegisterForm />);

        const createRandomUserButton = screen.getByRole('button', { name: 'Create Random User' });

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
