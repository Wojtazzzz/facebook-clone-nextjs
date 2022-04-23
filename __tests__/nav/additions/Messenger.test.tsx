import { generateStore } from '@redux/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import RootUserJson from '@mocks/user/root.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import MessengerEmptyPageJson from '@mocks/messenger/empty.json';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import { Additions } from '@components/nav/additions/Additions';
import userEvent from '@testing-library/user-event';
import { Messenger } from '@components/nav/additions/messenger/Messenger';

describe('Messenger component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/user').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/user').reply(200, RootUserJson);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/messages/messenger?page=1').reply(200);
    });

    it('show messenger when click on messenger button', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerFirstPageJson);

        const user = userEvent.setup();
        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Additions />
                </SWRConfig>
            </Provider>,
        );

        const messengerButton = screen.getByTitle('Messenger');
        await user.click(messengerButton);

        const mainMessengerComponent = await screen.findByTestId('messenger-container');

        expect(mainMessengerComponent).toBeVisible();
    });

    it('close messenger when click on overlay', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerFirstPageJson);

        const user = userEvent.setup();
        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Additions />
                </SWRConfig>
            </Provider>,
        );

        const messengerButton = screen.getByTitle('Messenger');
        await user.click(messengerButton);

        const mainMessengerComponent = await screen.findByTestId('messenger-container');
        expect(mainMessengerComponent).toBeVisible();

        const messengerOverlay = screen.getByTestId('messenger-close_overlay');
        await user.click(messengerOverlay);

        expect(mainMessengerComponent).not.toBeVisible();
    });

    it('render header and searchbar', () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerFirstPageJson);

        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Messenger />
                </SWRConfig>
            </Provider>,
        );

        const header = screen.getByTestId('messenger-header');
        const searchbar = screen.getByLabelText('Search user');

        expect(header).toBeInTheDocument();
        expect(searchbar).toBeInTheDocument();
    });

    it('render loaders on initial fetching users', () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerFirstPageJson);

        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Messenger />
                </SWRConfig>
            </Provider>,
        );

        const loader = screen.getByTestId('messenger-fetching_loader');

        expect(loader).toBeInTheDocument();
    });

    it('render properly first list of users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerFirstPageJson);

        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Messenger />
                </SWRConfig>
            </Provider>,
        );

        const firstElement = await screen.findByText(MessengerFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(MessengerFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/messages/messenger?page=1')
            .reply(200, MessengerEmptyPageJson);

        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Messenger />
                </SWRConfig>
            </Provider>,
        );

        const emptyComponent = await screen.findByText('Your Messenger is empty');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render properly error component when api return error', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/messages/messenger?page=1').reply(500);

        const store = generateStore();

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Messenger />
                </SWRConfig>
            </Provider>,
        );

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });
});
