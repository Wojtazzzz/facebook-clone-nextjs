import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Panel } from '@components/nav/panel/Panel';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('Nav Panel component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('open messenger dropdown when click on messenger button and close when click one more time', () => {
        renderWithDefaultData(<Panel />);

        const messengerOpenButton = screen.getByLabelText('Messenger');
        messengerOpenButton.click();

        const messengerComponent = screen.getByTestId('messenger-container');

        expect(messengerComponent).toBeVisible();
    });

    it('open notifications dropdown when click on notifications button and close when click one more time', () => {
        renderWithDefaultData(<Panel />);

        const notificationsOpenButton = screen.getByLabelText('Notifications');
        notificationsOpenButton.click();

        const notificationsComponent = screen.getByTestId('notifications-container');

        expect(notificationsComponent).toBeVisible();
    });
});
