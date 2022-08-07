import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Dropdown } from './Dropdown';

describe('Dropdown component', () => {
    it('render properly header for messenger', () => {
        const mockClose = jest.fn();

        mock('/api/messages?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Dropdown type="Messenger" close={mockClose} />);

        const header = screen.getByText('Messenger');

        expect(header).toBeInTheDocument();
    });

    it('render properly header for notifications', () => {
        const mockClose = jest.fn();

        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Dropdown type="Notifications" close={mockClose} />);

        const header = screen.getByText('Notifications');

        expect(header).toBeInTheDocument();
    });

    it('render properly list for messenger', async () => {
        const mockClose = jest.fn();

        mock('/api/messages?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Dropdown type="Messenger" close={mockClose} />);

        const list = await screen.findByTestId('messenger-list');

        expect(list).toBeInTheDocument();
    });

    it('render properly list for notifications', async () => {
        const mockClose = jest.fn();

        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Dropdown type="Notifications" close={mockClose} />);

        const list = await screen.findByTestId('notifications-list');

        expect(list).toBeInTheDocument();
    });
});
