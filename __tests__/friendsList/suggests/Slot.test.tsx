import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import { SWRConfig } from 'swr';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';

describe('Single friend component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/suggests?page=1').reply(200);
        nock(BACKEND_URL)
            .defaultReplyHeaders(nockReplyHeaders)
            .get('/api/friendship/suggests?page=1')
            .reply(200, SuggestsFirstPageJson);
    });

    it('renders user image, name, poked data, invite button', async () => {
        const user = SuggestsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="suggests" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        const userName = await screen.findByText(user.name);
        const userProfileImage = await screen.findByAltText(user.name);
        const inviteButton = await screen.findByTitle('Invite');

        expect(userProfileImage).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(inviteButton).toBeInTheDocument();
    });

    it('shows success message on successfully sent invite', async () => {
        const user = SuggestsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="suggests" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invite').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/invite').reply(201);

        const inviteButton = await screen.findByTitle('Invite');
        inviteButton.click();

        const successMessage = await screen.findByText('Request sent successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed request sent', async () => {
        const user = SuggestsFirstPageJson[0];

        render(
            <Provider store={store}>
                <SWRConfig value={{ provider: () => new Map() }}>
                    <Slot key={user.id} {...user}>
                        <Actions friend={user} type="suggests" />
                    </Slot>
                </SWRConfig>
            </Provider>,
        );

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/friendship/invite').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/friendship/invite').reply(500);

        const inviteButton = await screen.findByTitle('Invite');
        inviteButton.click();

        const errorMessage = await screen.findByText('Something went wrong, try again later');
        expect(errorMessage).toBeInTheDocument();
    });
});
