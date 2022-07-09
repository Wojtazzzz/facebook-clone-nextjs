import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import { Header } from '@components/nav/panel/inc/Header';

describe('Messenger component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/messages?page=1', 200, MessengerFirstPageJson);
    });

    it('renders with properly title', () => {
        renderWithDefaultData(<Header title="Messenger" />);

        const title = screen.getByText('Messenger');

        expect(title).toBeInTheDocument();
    });
});
