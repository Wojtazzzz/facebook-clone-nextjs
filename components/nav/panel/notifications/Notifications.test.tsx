import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Notifications component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/notifications/mark-as-read', 204, {}, 'put');
    });

    it('render header', () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        const header = screen.getByTestId('notifications-header');
        expect(header).toBeInTheDocument();
    });

    it('render loaders on initial fetching notifications', () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        const loader = screen.getByTestId('notifications-fetching_loader');

        expect(loader).toBeInTheDocument();
    });

    it('render properly first list of notifications', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        const firstElement = await screen.findByText(NotificationsFirstPageJson[0].friend.name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(NotificationsFirstPageJson[9].friend.name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        mock('/api/notifications?page=1', 200, []);

        renderWithDefaultData(<Notifications />);

        const emptyComponent = await screen.findByText('Your Notifications list is empty');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render properly error component when api return error', async () => {
        mock('/api/notifications?page=1', 500);

        renderWithDefaultData(<Notifications />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });

    it('renders properly notifications labels', () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        NotificationsFirstPageJson.forEach(async (notification) => {
            const label = await screen.findByText(notification.message);
            expect(label).toBeInTheDocument();
        });
    });
});
