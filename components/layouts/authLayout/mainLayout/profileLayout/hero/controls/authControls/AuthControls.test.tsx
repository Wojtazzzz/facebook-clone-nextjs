import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { AuthControls } from './AuthControls';

describe('AuthControls component tests', () => {
    it('render edit profile button which is disabled', async () => {
        renderWithDefaultData(<AuthControls />);

        const editButton = await screen.findByLabelText('Edit profile');

        expect(editButton).toBeInTheDocument();
        expect(editButton).toBeDisabled();
    });

    it('render credentials button which is enabled', async () => {
        renderWithDefaultData(<AuthControls />);

        const credentialsButton = await screen.findByLabelText('Credentials');

        expect(credentialsButton).toBeInTheDocument();
        expect(credentialsButton).toBeEnabled();
    });
});
