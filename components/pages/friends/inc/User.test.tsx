import { screen } from '@testing-library/react';
import nock from 'nock';
import { User } from '@components/pages/friends/inc/User';
import { Actions } from '@components/pages/friends/inc/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';

describe('User component', () => {
    describe('User from Suggests List', () => {
        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, invite button', async () => {
            const user = SuggestsFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="SUGGESTS" />
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
                    <Actions friend={user} listType="SUGGESTS" />
                </User>
            );

            mock('/api/friendship/invite', 201, {}, 'post');

            const inviteButton = await screen.findByTitle('Invite');
            inviteButton.click();

            const successMessage = await screen.findByText('Request sent successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed request sent', async () => {
            const user = SuggestsFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="SUGGESTS" />
                </User>
            );

            mock('/api/friendship/invite', 500, {}, 'post');

            const inviteButton = await screen.findByTitle('Invite');
            inviteButton.click();

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from Pokes List', () => {
        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data', async () => {
            const user = PokesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="POKES" />
                </User>
            );

            const userName = await screen.findByText(user.name);
            const userProfileImage = await screen.findByAltText(user.name);
            const pokesCount = await screen.findByText(
                `${user.first_name} poked you ${user.poke_info.count} times in a row`
            );
            const pokeDate = await screen.findByText(user.poke_info.updated_at);

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(pokesCount).toBeInTheDocument();
            expect(pokeDate).toBeInTheDocument();
        });

        it('shows success message on successfully poke', async () => {
            const user = PokesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="POKES" />
                </User>
            );

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock('/api/pokes/update', 201, {}, 'post');

            pokeButton.click();

            const successMessage = await screen.findByText('Friend poked back');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed poke', async () => {
            const user = PokesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="POKES" />
                </User>
            );

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock('/api/pokes/update', 500, {}, 'post');

            pokeButton.click();

            const errorMessage = await screen.findByText('Something went wrong');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from Invites List', () => {
        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, invite button', async () => {
            const user = InvitesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="INVITES" />
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
                    <Actions friend={user} listType="INVITES" />
                </User>
            );

            mock('/api/friendship/reject', 201, {}, 'post');

            const rejectButton = await screen.findByTitle('Reject');
            rejectButton.click();

            const successMessage = await screen.findByText('Request rejected successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed reject invite', async () => {
            const user = InvitesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="INVITES" />
                </User>
            );

            mock('/api/friendship/reject', 500, {}, 'post');

            const rejectButton = await screen.findByTitle('Reject');
            rejectButton.click();

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows success message on successfully accept invite', async () => {
            const user = InvitesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="INVITES" />
                </User>
            );

            mock('/api/friendship/accept', 201, {}, 'post');

            const acceptButton = await screen.findByTitle('Accept');
            acceptButton.click();

            const successMessage = await screen.findByText('Request accepted successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed reject invite', async () => {
            const user = InvitesFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="INVITES" />
                </User>
            );

            mock('/api/friendship/accept', 500, {}, 'post');

            const acceptButton = await screen.findByTitle('Accept');
            acceptButton.click();

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });
    });

    describe('User from Friends List', () => {
        beforeEach(() => {
            nock.disableNetConnect();
        });

        it('renders user image, name, poked data, buttons', async () => {
            const user = FriendsFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="FRIENDS" />
                </User>
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
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="FRIENDS" />
                </User>
            );

            mock('/api/friendship/destroy', 201, {}, 'post');

            const removeButton = await screen.findByTitle('Remove');
            removeButton.click();

            const successMessage = await screen.findByText('Friendship destroyed');
            expect(successMessage).toBeInTheDocument();
        });

        it('shows error message on failed destroying friendship', async () => {
            const user = FriendsFirstPageJson[0];

            renderWithDefaultData(
                <User key={user.id} {...user}>
                    <Actions friend={user} listType="FRIENDS" />
                </User>
            );

            mock('/api/friendship/destroy', 500, {}, 'post');

            const removeButton = await screen.findByTitle('Remove');
            removeButton.click();

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
