import { screen } from '@testing-library/react';
import nock from 'nock';
import { Item } from '@components/pages/friends/item/Item';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import userEvent from '@testing-library/user-event';

describe('Item component', () => {
    const user = userEvent.setup();

    describe('Item from Suggests List', () => {
        const jsonUser = SuggestsFirstPageJson[0].friend;

        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, invite button', async () => {
            renderWithDefaultData(<Item type="Suggests" friend={jsonUser} />);

            const userName = await screen.findByText(jsonUser.name);
            const userProfileImage = await screen.findByAltText(jsonUser.name);
            const inviteButton = await screen.findByTitle('Invite');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(inviteButton).toBeInTheDocument();
        });

        it('shows success message on successfully sent invite', async () => {
            renderWithDefaultData(<Item type="Suggests" friend={jsonUser} />);

            mock('/api/friendship/invite', 201, {}, 'post');

            const inviteButton = await screen.findByTitle('Invite');
            await user.click(inviteButton);

            const successMessage = await screen.findByText('Request sent successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed request sent', async () => {
            renderWithDefaultData(<Item type="Suggests" friend={jsonUser} />);

            mock('/api/friendship/invite', 500, {}, 'post');

            const inviteButton = await screen.findByTitle('Invite');
            await user.click(inviteButton);

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from Pokes List', () => {
        const jsonUser = PokesFirstPageJson[0].friend;
        const jsonData = PokesFirstPageJson[0].data;

        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data', async () => {
            renderWithDefaultData(<Item type="Pokes" friend={jsonUser} data={jsonData} />);

            const userName = await screen.findByText(jsonUser.name);
            const userProfileImage = await screen.findByAltText(jsonUser.name);
            const pokesCount = await screen.findByText(
                `${jsonUser.first_name} poked you ${jsonData.count} times in a row`
            );
            const pokeDate = await screen.findByText(jsonData.updated_at);

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(pokesCount).toBeInTheDocument();
            expect(pokeDate).toBeInTheDocument();
        });

        it('shows success message on successfully poke', async () => {
            renderWithDefaultData(<Item type="Pokes" friend={jsonUser} data={jsonData} />);

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock('/api/pokes', 201, {}, 'post');

            await user.click(pokeButton);

            const successMessage = await screen.findByText('Friend poked back');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed poke', async () => {
            renderWithDefaultData(<Item type="Pokes" friend={jsonUser} data={jsonData} />);

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock('/api/pokes', 500, {}, 'post');

            await user.click(pokeButton);

            const errorMessage = await screen.findByText('Something went wrong');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from Invites List', () => {
        const jsonUser = InvitesFirstPageJson[0].friend;

        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, invite button', async () => {
            renderWithDefaultData(<Item type="Invites" friend={jsonUser} />);

            const userName = await screen.findByText(jsonUser.name);
            const userProfileImage = await screen.findByAltText(jsonUser.name);
            const rejectButton = await screen.findByTitle('Reject');
            const acceptButton = await screen.findByTitle('Accept');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(rejectButton).toBeInTheDocument();
            expect(acceptButton).toBeInTheDocument();
        });

        it('shows success message on successfully reject invite', async () => {
            renderWithDefaultData(<Item type="Invites" friend={jsonUser} />);

            mock('/api/friendship/reject', 201, {}, 'post');

            const rejectButton = await screen.findByTitle('Reject');
            await user.click(rejectButton);

            const successMessage = await screen.findByText('Request rejected successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed reject invite', async () => {
            renderWithDefaultData(<Item type="Invites" friend={jsonUser} />);

            mock('/api/friendship/reject', 500, {}, 'post');

            const rejectButton = await screen.findByTitle('Reject');
            await user.click(rejectButton);

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows success message on successfully accept invite', async () => {
            renderWithDefaultData(<Item type="Invites" friend={jsonUser} />);

            mock('/api/friendship/accept', 201, {}, 'post');

            const acceptButton = await screen.findByTitle('Accept');
            await user.click(acceptButton);

            const successMessage = await screen.findByText('Request accepted successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed reject invite', async () => {
            renderWithDefaultData(<Item type="Invites" friend={jsonUser} />);

            mock('/api/friendship/accept', 500, {}, 'post');

            const acceptButton = await screen.findByTitle('Accept');
            await user.click(acceptButton);

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });
    });

    describe('User from Friends List', () => {
        const jsonUser = FriendsFirstPageJson[0].friend;

        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, buttons', async () => {
            renderWithDefaultData(<Item type="Friends" friend={jsonUser} />);

            const userName = await screen.findByText(jsonUser.name);
            const userProfileImage = await screen.findByAltText(jsonUser.name);
            const sendMessageButton = await screen.findByTitle('Send message');
            const removeButton = await screen.findByTitle('Remove');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(sendMessageButton).toBeInTheDocument();
            expect(removeButton).toBeInTheDocument();
        });

        it('shows success message on successfully destroyed friendship', async () => {
            renderWithDefaultData(<Item type="Friends" friend={jsonUser} />);

            mock('/api/friendship/destroy', 201, {}, 'post');

            const removeButton = await screen.findByTitle('Remove');
            await user.click(removeButton);

            const successMessage = await screen.findByText('Friendship destroyed');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed destroying friendship', async () => {
            renderWithDefaultData(<Item type="Friends" friend={jsonUser} />);

            mock('/api/friendship/destroy', 500, {}, 'post');

            const removeButton = await screen.findByTitle('Remove');
            await user.click(removeButton);

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
