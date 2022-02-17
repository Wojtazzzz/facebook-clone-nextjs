import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { LoginForm } from '@components/auth/LoginForm';
import { act } from 'react-dom/test-utils';


describe('Login Form', () => {
    it('Can write on input email', () => {
        const { getByLabelText, getByDisplayValue } = render(<LoginForm />);

        const input = getByLabelText('Address e-mail');

        act(() => {
            fireEvent.change(input, { target: { value: 'test@test.com' } });
        });

        const textNode = getByDisplayValue('test@test.com');

        expect(textNode).toBeInTheDocument();
    });

    it('Can write on input password', () => {
        const { getByLabelText, getByDisplayValue } = render(<LoginForm />);

        const input = getByLabelText('Password');

        act(() => {
            fireEvent.change(input, { target: { value: 'secret_password' } });
        });

        const textNode = getByDisplayValue('secret_password');

        expect(textNode).toBeInTheDocument();
    });

    it('shows invalid email validation message', async () => {
        const { getByLabelText, getByText, findByText } = render(<LoginForm />);

        const input = getByLabelText('Address e-mail');
        fireEvent.change(input, { target: { value: 'test_email_which_is_invalid' } });

        const button = getByText('Login');

        act(() => {
            fireEvent.click(button);
        });

        const errorMessage = await findByText('Email is invalid');

        expect(errorMessage).toBeInTheDocument();
    });

    it('shows required email and password validation message', async () => {
        const { getByText, findByText } = render(<LoginForm />);

        const button = getByText('Login');

        act(() => {
            fireEvent.click(button);
        });

        const emailErrorMessage = await findByText('Email field is required');
        const passwordErrorMessage = await findByText('Password field is required');

        expect(emailErrorMessage).toBeInTheDocument();
        expect(passwordErrorMessage).toBeInTheDocument();
    });
});