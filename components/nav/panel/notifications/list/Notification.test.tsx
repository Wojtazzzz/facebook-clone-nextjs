import { screen } from '@testing-library/react';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import PokeNotificationJson from '@mocks/notifications/poke.json';
import FriendshipRequestAcceptedNotificationJson from '@mocks/notifications/requestAccepted.json';
import FriendshipRequestSentNotificationJson from '@mocks/notifications/requestSent.json';
import { Notification } from '@components/nav/panel/notifications/list/Notification';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Notification component', () => {
    it('render user avatar, name and message', () => {
        const notification = NotificationsFirstPageJson.data[0];

        renderWithDefaultData(<Notification {...notification} />);

        const avatar = screen.getByRole('img');
        const name = screen.getByText(notification.friend.name);
        const message = screen.getByText(notification.message);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });

    it('poked notification renders properly message', () => {
        const notification = PokeNotificationJson;

        renderWithDefaultData(<Notification {...notification} />);

        const message = screen.getByText(notification.message);

        expect(message).toBeInTheDocument();
    });

    it('friendship request accepted notification renders properly message', () => {
        const notification = FriendshipRequestAcceptedNotificationJson;

        renderWithDefaultData(<Notification {...notification} />);

        const message = screen.getByText('Accepted your friendship invitation');

        expect(message).toBeInTheDocument();
    });

    it('friendship request sent notification renders properly message', () => {
        const notification = FriendshipRequestSentNotificationJson;

        renderWithDefaultData(<Notification {...notification} />);

        const message = screen.getByText('Sent you a friendship invitation');

        expect(message).toBeInTheDocument();
    });
});
