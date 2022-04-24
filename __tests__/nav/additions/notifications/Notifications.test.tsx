import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import NotificationsEmptyPageJson from '@mocks/notifications/empty.json';
import nock from 'nock';
import { Additions } from '@components/nav/additions/Additions';
import userEvent from '@testing-library/user-event';
import { Notifications } from '@components/nav/additions/notifications/Notifications';
import { NotificationType } from '@ctypes/features/NotificationType';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

const labels = {
    FRIENDSHIP_INVITATION_SENDED: 'Send you a friendship invitation',
    FRIENDSHIP_INVITATION_ACCEPTED: 'Accepted your friendship invitation',
} as const;

describe('Notifications component', () => {
    beforeEach(() => {
        nock.disableNetConnect();

        mock('/api/user', 200, RootUserJson);
    });

    it('show notifications when click on notifications button', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        const user = userEvent.setup();

        renderWithDefaultData(<Additions />);

        const notificationsButton = screen.getByTitle('Notifications');
        await user.click(notificationsButton);

        const mainNotificationsComponent = await screen.findByTestId('notifications-container');

        expect(mainNotificationsComponent).toBeVisible();
    });

    it('close notifications when click on overlay', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        const user = userEvent.setup();

        renderWithDefaultData(<Additions />);

        const notificationsButton = screen.getByTitle('Notifications');
        await user.click(notificationsButton);

        const mainNotificationsComponent = await screen.findByTestId('notifications-container');
        expect(mainNotificationsComponent).toBeVisible();

        const notificationsOverlay = screen.getByTestId('notifications-close_overlay');
        await user.click(notificationsOverlay);

        expect(mainNotificationsComponent).not.toBeVisible();
    });

    it('render header and mark as read', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        const header = screen.getByTestId('notifications-header');
        const markAsRead = await screen.findByText('Mark all as read');

        expect(header).toBeInTheDocument();
        expect(markAsRead).toBeInTheDocument();
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

        const firstElement = await screen.findByText(NotificationsFirstPageJson[0].data.initiator.name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(NotificationsFirstPageJson[9].data.initiator.name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        mock('/api/notifications?page=1', 200, NotificationsEmptyPageJson);

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

    it('renders properly notifications labels', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Notifications />);

        (NotificationsFirstPageJson as NotificationType[]).forEach(async (notification) => {
            const label = await screen.findByText(labels[notification.data.type]);

            expect(label).toBeInTheDocument();
        });
    });
});
