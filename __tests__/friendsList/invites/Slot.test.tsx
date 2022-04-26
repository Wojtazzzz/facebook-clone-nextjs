import { screen } from '@testing-library/react';
import nock from 'nock';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import { User } from '@components/pages/friends/inc/User';
import { Actions } from '@components/pages/friends/inc/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Single invite component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('renders user image, name, poked data, invite button', async () => {
        const user = InvitesFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="invites" />
            </User>
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

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="invites" />
            </User>
        );

        mock('/api/friendship/reject', 201, {}, 'POST');

        const rejectButton = await screen.findByTitle('Reject');
        rejectButton.click();

        const successMessage = await screen.findByText('Request rejected successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed reject invite', async () => {
        const user = InvitesFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="invites" />
            </User>
        );

        mock('/api/friendship/reject', 500, {}, 'POST');

        const rejectButton = await screen.findByTitle('Reject');
        rejectButton.click();

        const successMessage = await screen.findByText('Something went wrong, try again later');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows success message on successfully accept invite', async () => {
        const user = InvitesFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="invites" />
            </User>
        );

        mock('/api/friendship/accept', 201, {}, 'POST');

        const acceptButton = await screen.findByTitle('Accept');
        acceptButton.click();

        const successMessage = await screen.findByText('Request accepted successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed reject invite', async () => {
        const user = InvitesFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="invites" />
            </User>
        );

        mock('/api/friendship/accept', 500, {}, 'POST');

        const acceptButton = await screen.findByTitle('Accept');
        acceptButton.click();

        const successMessage = await screen.findByText('Something went wrong, try again later');
        expect(successMessage).toBeInTheDocument();
    });
});
