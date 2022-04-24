import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import MessengerEmptyPageJson from '@mocks/messenger/empty.json';
import nock from 'nock';
import { Additions } from '@components/nav/additions/Additions';
import userEvent from '@testing-library/user-event';
import { Messenger } from '@components/nav/additions/messenger/Messenger';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Messenger component', () => {
    beforeEach(() => {
        nock.disableNetConnect();

        mock('/api/user', 200, RootUserJson);
    });

    it('show messenger when click on messenger button', async () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        const user = userEvent.setup();

        renderWithDefaultData(<Additions />);

        const messengerButton = screen.getByTitle('Messenger');
        await user.click(messengerButton);

        const mainMessengerComponent = await screen.findByTestId('messenger-container');

        expect(mainMessengerComponent).toBeVisible();
    });

    it('close messenger when click on overlay', async () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        const user = userEvent.setup();

        renderWithDefaultData(<Additions />);

        const messengerButton = screen.getByTitle('Messenger');
        await user.click(messengerButton);

        const mainMessengerComponent = await screen.findByTestId('messenger-container');
        expect(mainMessengerComponent).toBeVisible();

        const messengerOverlay = screen.getByTestId('messenger-close_overlay');
        await user.click(messengerOverlay);

        expect(mainMessengerComponent).not.toBeVisible();
    });

    it('render header and searchbar', () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Messenger />);

        const header = screen.getByTestId('messenger-header');
        const searchbar = screen.getByLabelText('Search user');

        expect(header).toBeInTheDocument();
        expect(searchbar).toBeInTheDocument();
    });

    it('render loaders on initial fetching users', () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Messenger />);

        const loader = screen.getByTestId('messenger-fetching_loader');

        expect(loader).toBeInTheDocument();
    });

    it('render properly first list of users', async () => {
        mock('/api/messages/messenger?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<Messenger />);

        const firstElement = await screen.findByText(MessengerFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(MessengerFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        mock('/api/messages/messenger?page=1', 200, MessengerEmptyPageJson);

        renderWithDefaultData(<Messenger />);

        const emptyComponent = await screen.findByText('Your Messenger is empty');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render properly error component when api return error', async () => {
        mock('/api/messages/messenger?page=1', 500, MessengerEmptyPageJson);

        renderWithDefaultData(<Messenger />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });
});
