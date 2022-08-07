import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Panel } from '@components/nav/panel/Panel';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import NotificationsFirstPageJson from '@mocks/notifications/firstPage.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Panel component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('open messenger dropdown when click on messenger button and close when click one more time', async () => {
        mock('/api/messages?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Panel />);

        const messengerOpenButton = screen.getByLabelText('Messenger');
        await user.click(messengerOpenButton);

        const messengerComponent = screen.getByTestId('messenger-dropdown');

        expect(messengerComponent).toBeInTheDocument();
    });

    it('open notifications dropdown when click on notifications button and close when click one more time', async () => {
        mock('/api/notifications?page=1', 200, NotificationsFirstPageJson);

        renderWithDefaultData(<Panel />);

        const notificationsOpenButton = screen.getByLabelText('Notifications');
        await user.click(notificationsOpenButton);

        const notificationsComponent = screen.getByTestId('notifications-dropdown');

        expect(notificationsComponent).toBeInTheDocument();
    });
});
