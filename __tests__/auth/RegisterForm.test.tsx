import { RegisterForm } from '@components/auth/RegisterForm';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { render, screen } from '@testing-library/react';
import nock from 'nock';

describe('RegisterForm component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/user').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/user').reply(401);
    });

    it('checks for all inputs are disabled', () => {
        render(<RegisterForm />);

        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');
        const emailInput = screen.getByLabelText('Address e-mail');
        const passwordInput = screen.getByLabelText('Password');
        const passwordConfirmationInput = screen.getByLabelText('Password confirmation');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        [firstNameInput, lastNameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton].forEach(
            (element) => expect(element).toBeDisabled(),
        );
    });

    it('check for Create Random User button is not disabled', () => {
        render(<RegisterForm />);

        const createRandomUserButton = screen.getByRole('button', { name: 'Create Random User' });

        expect(createRandomUserButton).not.toBeDisabled();
    });
});
