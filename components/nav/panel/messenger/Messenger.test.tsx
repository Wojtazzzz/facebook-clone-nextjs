import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { Panel } from '@components/nav/panel/Panel';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import { Header } from '@components/nav/panel/inc/Header';

describe('Messenger component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('renders with properly title', () => {
        renderWithDefaultData(<Header title="Messenger" />);

        const title = screen.getByText('Messenger');

        expect(title).toBeInTheDocument();
    });

    it('close messenger when click on overlay', async () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        const user = userEvent.setup();

        renderWithDefaultData(<Panel />);

        const messengerButton = screen.getByTitle('Messenger');
        await user.click(messengerButton);

        const mainMessengerComponent = await screen.findByTestId('messenger-container');
        expect(mainMessengerComponent).toBeVisible();

        const messengerOverlay = screen.getByTestId('messenger-overlay');
        await user.click(messengerOverlay);

        expect(mainMessengerComponent).not.toBeVisible();
    });
});
