import { screen } from '@testing-library/react';
import nock from 'nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import { User } from '@components/pages/friends/inc/User';
import { Actions } from '@components/pages/friends/inc/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Single friend component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('renders user image, name, poked data, invite button', async () => {
        const user = SuggestsFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="suggests" />
            </User>
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

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="suggests" />
            </User>
        );

        mock('/api/friendship/invite', 201, {}, 'POST');

        const inviteButton = await screen.findByTitle('Invite');
        inviteButton.click();

        const successMessage = await screen.findByText('Request sent successfully');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed request sent', async () => {
        const user = SuggestsFirstPageJson[0];

        renderWithDefaultData(
            <User key={user.id} {...user}>
                <Actions friend={user} type="suggests" />
            </User>
        );

        mock('/api/friendship/invite', 500, {}, 'POST');

        const inviteButton = await screen.findByTitle('Invite');
        inviteButton.click();

        const errorMessage = await screen.findByText('Something went wrong, try again later');
        expect(errorMessage).toBeInTheDocument();
    });
});
