import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import RootUserJson from '@mocks/user/root.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';

describe('Single friend component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .options(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get(`/api/friendship/friends/${RootUserJson.id}?page=1`)
            .reply(200, FriendsFirstPageJson);
    });

    it('renders user image, name, poked data, buttons', async () => {
        const user = FriendsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="friends" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        const userName = await screen.findByText(user.name);
        const userProfileImage = await screen.findByAltText(user.name);
        const sendMessageButton = await screen.findByTitle('Send message');
        const removeButton = await screen.findByTitle('Remove');

        expect(userProfileImage).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(sendMessageButton).toBeInTheDocument();
        expect(removeButton).toBeInTheDocument();
    });

    it('shows success message on successfully destroyed friendship', async () => {
        const user = FriendsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="friends" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/destroy').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/destroy').reply(201);

        const removeButton = await screen.findByTitle('Remove');
        removeButton.click();

        const successMessage = await screen.findByText('Friendship destroyed');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed destroying friendship', async () => {
        const user = FriendsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="friends" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/destroy').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/destroy').reply(500);

        const removeButton = await screen.findByTitle('Remove');
        removeButton.click();

        const errorMessage = await screen.findByText('Something went wrong, try again later');
        expect(errorMessage).toBeInTheDocument();
    });
});
