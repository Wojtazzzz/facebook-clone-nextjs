import { screen } from '@testing-library/react';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import NotificationsEmptyPageJson from '@mocks/notifications/empty.json';
import { List } from '@components/nav/panel/notifications/list/List';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('List component', () => {
    const notifications = NotificationsFirstPageJson.data;

    it('render loaders on initial fetching notifications', () => {
        const mockClose = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsFirstPageJson,
        });

        mock({
            path: '/api/notifications',
            method: 'put',
        });

        renderWithDefaultData(<List close={mockClose} />);

        const loader = screen.getByTestId('notifications-fetching_loader');

        expect(loader).toBeInTheDocument();
    });

    it('render properly first list of notifications', async () => {
        const mockClose = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsFirstPageJson,
        });

        mock({
            path: '/api/notifications',
            method: 'put',
        });

        renderWithDefaultData(<List close={mockClose} />);

        const firstElement = await screen.findByText(notifications[0].friend.name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(notifications[9].friend.name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        const mockClose = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsEmptyPageJson,
        });

        renderWithDefaultData(<List close={mockClose} />);

        const emptyComponent = await screen.findByText('Notifications list is empty');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render properly error component when api return error', async () => {
        const mockClose = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            status: 500,
        });

        renderWithDefaultData(<List close={mockClose} />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });

    it('renders properly notifications labels', () => {
        const mockClose = jest.fn();

        mock({
            path: '/api/notifications?page=1',
            data: NotificationsFirstPageJson,
        });

        mock({
            path: '/api/notifications',
            method: 'put',
        });

        renderWithDefaultData(<List close={mockClose} />);

        notifications.forEach(async (notification) => {
            const label = await screen.findByText(notification.message);
            expect(label).toBeInTheDocument();
        });
    });
});
