import { screen } from '@testing-library/react';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Notifications Notification component', () => {
    it('it renders user avatar, name, notification label', () => {
        const notification = NotificationsFirstPageJson[0];

        renderWithDefaultData(<Notification {...notification} />);

        const avatar = screen.getByRole('img');
        const name = screen.getByText(notification.friend.name);
        const label = screen.getByText(notification.message);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
