import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import RootUserJson from '@mocks/user/root.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import PokesSecondPageJson from '@mocks/friendsList/pokes/secondPage.json';
import PokesEmptyPageJson from '@mocks/friendsList/pokes/empty.json';
import PokesWithHighestCountsJson from '@mocks/friendsList/pokes/highestCounts.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { List } from '@components/pages/friends/List';

describe('Pokes list', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('shows loaders on initial fetching users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads ten users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        const firstElement = await screen.findByText(PokesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(PokesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/pokes?page=2')
            .reply(200, PokesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/pokes?page=2')
            .reply(200, PokesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(PokesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(PokesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(PokesSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(PokesSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no users', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesEmptyPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(500);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows truthy pokes count', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/pokes?page=1')
            .reply(200, PokesWithHighestCountsJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="pokes" />
                </SWRConfig>
            </Provider>,
        );

        PokesWithHighestCountsJson.forEach(async (item) => {
            const element = await screen.findByText(
                `${item.first_name} poked you ${item.poke_info.count} times in a row`,
            );

            expect(element).toBeInTheDocument();
        });
    });
});
