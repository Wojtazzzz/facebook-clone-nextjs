import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Notifications } from './Notifications';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';

describe('Notifications component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mockResizeObserver();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsFirstPageJson,
        });

        mock({
            path: '/api/notifications',
            method: 'put',
        });

        mock({
            path: '/api/notifications/checkUnread',
            data: [false],
        });
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

    it('close dropdown by click on close button', async () => {
        renderWithDefaultData(<Notifications />);

        const button = screen.getByLabelText('Notifications');
        await user.click(button);

        const dropdown = screen.getByTestId('dropdown');

        expect(dropdown).toBeInTheDocument();

        const closeButton = screen.getByLabelText('Close dropdown');
        await user.click(closeButton);

        expect(dropdown).not.toBeInTheDocument();
    });

    it('dropdown render properly list', async () => {
        renderWithDefaultData(<Notifications />);

        const button = screen.getByLabelText('Notifications');
        await user.click(button);

        const list = await screen.findByTestId('notifications-list');

        expect(list).toBeInTheDocument();
    });

    it('render properly header for notifications', async () => {
        renderWithDefaultData(<Notifications />);

        const button = screen.getByLabelText('Notifications');
        await user.click(button);

        const header = screen.getByText('Notifications');

        expect(header).toBeInTheDocument();
    });
});
