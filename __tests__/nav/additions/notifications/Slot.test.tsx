import { screen } from '@testing-library/react';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { NotificationType } from '@ctypes/features/NotificationType';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

const labels = {
    FRIENDSHIP_INVITATION_SENDED: 'Send you a friendship invitation',
    FRIENDSHIP_INVITATION_ACCEPTED: 'Accepted your friendship invitation',
} as const;

describe('Notifications slot component', () => {
    it('it renders user avatar, name, notification label', async () => {
        const notification = NotificationsFirstPageJson[0] as NotificationType;

        renderWithDefaultData(<Notification data={notification.data} read_at={notification.read_at} />);

        const initiator = notification.data.initiator;

        const avatar = screen.getByAltText(initiator.name);
        const name = screen.getByAltText(initiator.name);
        const label = screen.getByText(labels[notification.data.type]);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
