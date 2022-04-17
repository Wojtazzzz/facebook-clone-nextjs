import { store } from '@redux/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import RootUserJson from '@mocks/user/root.json';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import ContactsSecondPageJson from '@mocks/contacts/secondPage.json';
import EmptyJson from '@mocks/contacts/empty.json';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { Contacts } from '@components/contacts/Contacts';
import { SWRConfig } from 'swr';

describe('Contacts component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/user').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/user').reply(200, RootUserJson);
    });

    it('renders section title', () => {
        render(
            <Provider store={store}>
                <Contacts />
            </Provider>,
        );

        const title = screen.getByText('Contacts');

        expect(title).toBeInTheDocument();
    });

    it('loads first contacts list', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, ContactsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Contacts />
                </SWRConfig>
            </Provider>,
        );

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();
    });

    it('loads empty list and show empty component', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, EmptyJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Contacts />
                </SWRConfig>
            </Provider>,
        );

        const emptyComponent = await screen.findByText('No contacts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component on api error', async () => {
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
                    <Contacts />
                </SWRConfig>
            </Provider>,
        );

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });

    it('loads more contacts on click on load more button', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, ContactsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Contacts />
                </SWRConfig>
            </Provider>,
        );

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, ContactsFirstPageJson);

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200, ContactsSecondPageJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        loadMoreButton.click();

        const eleventhContact = await screen.findByText(ContactsSecondPageJson[0].name);
        expect(eleventhContact).toBeInTheDocument();

        const twentythContact = await screen.findByText(ContactsSecondPageJson[9].name);
        expect(twentythContact).toBeInTheDocument();
    });

    it('fetch button dissapears when page fetch all contacts', async () => {
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, ContactsFirstPageJson);

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Contacts />
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
            .reply(200, ContactsFirstPageJson);

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=2`)
            .reply(200, EmptyJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        loadMoreButton.click();

        expect(loadMoreButton).not.toBeInTheDocument();
    });
});
