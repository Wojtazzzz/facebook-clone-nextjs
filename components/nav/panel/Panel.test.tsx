import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Panel } from '@components/nav/panel/Panel';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';

describe('Panel component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        mockResizeObserver();
    });

    it('open messenger dropdown when click on messenger button and close when click one more time', async () => {
        const mockToggleMenu = jest.fn();

        mock({
            path: '/api/messages?page=1',
            data: MessengerFirstPageJson,
        });

        renderWithDefaultData(<Panel toggleMenu={mockToggleMenu} />);

        const messengerOpenButton = screen.getByLabelText('Messenger');
        await user.click(messengerOpenButton);

        const messengerDropdown = screen.getByTestId('dropdown');

        expect(messengerDropdown).toBeInTheDocument();
    });

    it('open notifications dropdown when click on notifications button and close when click one more time', async () => {
        const mockToggleMenu = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsFirstPageJson,
        });

        renderWithDefaultData(<Panel toggleMenu={mockToggleMenu} />);

        const notificationsOpenButton = screen.getByLabelText('Notifications');
        await user.click(notificationsOpenButton);

        const notificationsDropdown = screen.getByTestId('dropdown');

        expect(notificationsDropdown).toBeInTheDocument();
    });
});
