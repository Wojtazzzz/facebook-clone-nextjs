import { screen } from '@testing-library/react';
import nock from 'nock';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Single friend component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('renders user image, name, poked data, buttons', async () => {
        const user = FriendsFirstPageJson[0];

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="friends" />
            </Slot>
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

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="friends" />
            </Slot>
        );

        mock('/api/friendship/destroy', 201, {}, 'POST');

        const removeButton = await screen.findByTitle('Remove');
        removeButton.click();

        const successMessage = await screen.findByText('Friendship destroyed');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed destroying friendship', async () => {
        const user = FriendsFirstPageJson[0];

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="friends" />
            </Slot>
        );

        mock('/api/friendship/destroy', 500, {}, 'POST');

        const removeButton = await screen.findByTitle('Remove');
        removeButton.click();

        const errorMessage = await screen.findByText('Something went wrong, try again later');
        expect(errorMessage).toBeInTheDocument();
    });
});
