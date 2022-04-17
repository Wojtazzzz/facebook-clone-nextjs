import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import RootUserJson from '@mocks/user/root.json';
import InvitesFirstPageJson from '@mocks/friendsList/invites/firstPage.json';
import InvitesSecondPageJson from '@mocks/friendsList/invites/secondPage.json';
import InvitesEmptyPageJson from '@mocks/friendsList/invites/empty.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { List } from '@components/pages/friends/List';

describe('Invites list', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('fetch button dissapears when page fetched all invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=2')
            .reply(200, InvitesEmptyPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        expect(fetchMoreButton).not.toBeInTheDocument();
    });

    it('shows loaders on initial fetching invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .delay(99999)
            .reply(200, InvitesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads 10 invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        const firstElement = await screen.findByText(InvitesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(InvitesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=2')
            .reply(200, InvitesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesFirstPageJson);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=2').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=2')
            .reply(200, InvitesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(InvitesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(InvitesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(InvitesSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(InvitesSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no invites', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/invites?page=1')
            .reply(200, InvitesEmptyPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invites?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/friendship/invites?page=1').reply(500);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="invites" />
                </SWRConfig>
            </Provider>,
        );

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
