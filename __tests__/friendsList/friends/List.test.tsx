import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import RootUserJson from '@mocks/user/root.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import FriendsSecondPageJson from '@mocks/friendsList/friends/secondPage.json';
import FriendsEmptyPageJson from '@mocks/friendsList/friends/empty.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { List } from '@components/pages/friends/List';

describe('Friends list', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('shows loaders on initial fetching users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads ten users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        const firstElement = await screen.findByText(FriendsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(FriendsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200, FriendsSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200, FriendsSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(FriendsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(FriendsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(FriendsSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(FriendsSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no users', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsEmptyPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(500);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <List userId={RootUserJson.id} type="friends" />
                </SWRConfig>
            </Provider>,
        );

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
