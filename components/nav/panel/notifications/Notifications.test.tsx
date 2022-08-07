import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Notifications } from './Notifications';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';

describe('Notifications component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);
    });

    it('not render dropdown by default', () => {
        renderWithDefaultData(<Notifications />);

        const dropdown = screen.queryByTestId('dropdown');

        expect(dropdown).not.toBeInTheDocument();
    });

    it('open dropdown by click on button', async () => {
        renderWithDefaultData(<Notifications />);

        const button = screen.getByLabelText('Notifications');
        await user.click(button);

        const dropdown = screen.getByTestId('dropdown');

        expect(dropdown).toBeInTheDocument();
    });

    it('dropdown render properly list', async () => {
        renderWithDefaultData(<Notifications />);

        const button = screen.getByLabelText('Notifications');
        await user.click(button);

        const list = await screen.findByTestId('notifications-list');

        expect(list).toBeInTheDocument();
    });
});
