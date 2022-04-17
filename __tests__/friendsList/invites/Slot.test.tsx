import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';

describe('Single invite component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, InvitesFirstPageJson);
    });

    it('renders user image, name, poked data, invite button', async () => {
        const user = InvitesFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="invites" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        const userName = await screen.findByText(user.name);
        const userProfileImage = await screen.findByAltText(user.name);
        const rejectButton = await screen.findByTitle('Reject');
        const acceptButton = await screen.findByTitle('Accept');

        expect(userProfileImage).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(rejectButton).toBeInTheDocument();
        expect(acceptButton).toBeInTheDocument();
    });

    it('shows success message on successfully reject invite', async () => {
        const user = InvitesFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="invites" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/reject').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/reject').reply(201);

        const rejectButton = await screen.findByTitle('Reject');
        rejectButton.click();

        const successMessage = await screen.findByText('Request rejected successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed reject invite', async () => {
        const user = InvitesFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="invites" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/reject').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/reject').reply(500);

        const rejectButton = await screen.findByTitle('Reject');
        rejectButton.click();

        const successMessage = await screen.findByText('Something went wrong, try again later');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows success message on successfully accept invite', async () => {
        const user = InvitesFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="invites" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/accept').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/accept').reply(201);

        const acceptButton = await screen.findByTitle('Accept');
        acceptButton.click();

        const successMessage = await screen.findByText('Request accepted successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed reject invite', async () => {
        const user = InvitesFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="invites" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/accept').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/accept').reply(500);

        const acceptButton = await screen.findByTitle('Accept');
        acceptButton.click();

        const successMessage = await screen.findByText('Something went wrong, try again later');
        expect(successMessage).toBeInTheDocument();
    });
});
