import { mock } from '@utils/nock';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Logout } from './Logout';
import RootUserJson from '@mocks/user/root.json';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Logout component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('after click button change to disabled', async () => {
        mock({
            path: '/api/logout',
            status: 204,
        });

        renderWithDefaultData(<Logout />);

        const button = screen.getByLabelText('Log out');

        await user.click(button);

        await waitFor(() => {
            expect(button).toBeDisabled();
        });
    });
});
