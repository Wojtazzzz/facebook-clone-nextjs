import { screen } from '@testing-library/react';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { notificationsMessages } from '@constants/notificationsMessages';
import type { NotificationType } from '@ctypes/features/NotificationType';

describe('Notifications Notification component', () => {
    it('it renders user avatar, name, notification label', () => {
        const notification = NotificationsFirstPageJson[0] as NotificationType;

        renderWithDefaultData(<Notification data={notification.data} read_at={notification.read_at} />);

        const initiator = notification.data.initiator;

        const avatar = screen.getByRole('img');
        const name = screen.getByText(initiator.name);
        const label = screen.getByText(notificationsMessages[notification.data.type]);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
