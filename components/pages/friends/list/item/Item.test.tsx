import { screen } from '@testing-library/react';
import nock from 'nock';
import { Item } from '@components/pages/friends/list/item/Item';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@libs/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import InviteAcceptedJson from '@mocks/friendsList/invites/accept.json';
import InviteRejectedJson from '@mocks/friendsList/invites/reject.json';
import userEvent from '@testing-library/user-event';

describe('Item component', () => {
    const user = userEvent.setup();

    describe('Item from suggests list', () => {
        const item = SuggestsFirstPageJson.data[0];

        it('render user image, name, poked data, invite button', async () => {
            renderWithDefaultData(<Item type="Suggests" item={item} />);

            const userName = await screen.findByText(item.friend.name);
            const userProfileImage = await screen.findByAltText(item.friend.name);
            const inviteButton = await screen.findByTitle('Invite');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(inviteButton).toBeInTheDocument();
        });

        it('render success message on successfully sent invite', async () => {
            renderWithDefaultData(<Item type="Suggests" item={item} />);

            mock({
                path: '/api/invites',
                status: 201,
                method: 'post',
            });

            const inviteButton = await screen.findByTitle('Invite');
            await user.click(inviteButton);

            const successMessage = await screen.findByText('Request sent successfully');
            expect(successMessage).toBeInTheDocument();
        });

        it('render error message on failed request', async () => {
            renderWithDefaultData(<Item type="Suggests" item={item} />);

            mock({
                path: '/api/invites',
                status: 500,
                method: 'post',
            });

            const inviteButton = await screen.findByTitle('Invite');
            await user.click(inviteButton);

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from pokes list', () => {
        const poke = PokesFirstPageJson.data[0];

        it('render user image, name, poke data', async () => {
            renderWithDefaultData(<Item type="Pokes" item={poke} />);

            const userName = await screen.findByText(poke.friend.name);
            const userProfileImage = await screen.findByAltText(poke.friend.name);
            const pokesCount = await screen.findByText(
                `${poke.friend.first_name} poked you ${poke.data.count} times in a row`
            );
            const pokeDate = await screen.findByText(poke.data.updated_at);

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(pokesCount).toBeInTheDocument();
            expect(pokeDate).toBeInTheDocument();
        });

        it('render success message on successfully poke', async () => {
            renderWithDefaultData(<Item type="Pokes" item={poke} />);

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock({
                path: '/api/pokes',
                status: 201,
                method: 'post',
            });

            await user.click(pokeButton);

            const successMessage = await screen.findByText('Friend poked back');
            expect(successMessage).toBeInTheDocument();
        });

        it('render error message on failed poke', async () => {
            renderWithDefaultData(<Item type="Pokes" item={poke} />);

            const pokeButton = await screen.findByTitle('Poke back');
            expect(pokeButton).toBeInTheDocument();

            mock({
                path: '/api/pokes',
                status: 500,
                method: 'post',
            });

            await user.click(pokeButton);

            const errorMessage = await screen.findByText('Something went wrong');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('User from invites list', () => {
        const item = InvitesFirstPageJson.data[0];

        it('render user image, name, invite button', async () => {
            renderWithDefaultData(<Item type="Invites" item={item} />);

            const userName = await screen.findByText(item.friend.name);
            const userProfileImage = await screen.findByAltText(item.friend.name);
            const rejectButton = await screen.findByTitle('Reject');
            const acceptButton = await screen.findByTitle('Accept');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(rejectButton).toBeInTheDocument();
            expect(acceptButton).toBeInTheDocument();
        });

        it('render success message on successfully reject invite', async () => {
            mock({
                path: `/api/invites/${item.friend.id}`,
                status: 201,
                method: 'put',
                data: InviteRejectedJson,
            });

            renderWithDefaultData(<Item type="Invites" item={item} />);

            const rejectButton = await screen.findByTitle('Reject');
            await user.click(rejectButton);

            const successMessage = await screen.findByText(InviteRejectedJson.message);
            expect(successMessage).toBeInTheDocument();
        });

        it('render error message on failed reject invite', async () => {
            renderWithDefaultData(<Item type="Invites" item={item} />);

            mock({
                path: `/api/invites/${item.friend.id}`,
                status: 500,
                method: 'put',
            });

            const rejectButton = await screen.findByTitle('Reject');
            await user.click(rejectButton);

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });

        it('render success message on successfully accept invite', async () => {
            renderWithDefaultData(<Item type="Invites" item={item} />);

            mock({
                path: `/api/invites/${item.friend.id}`,
                status: 201,
                method: 'put',
                data: InviteAcceptedJson,
            });

            const acceptButton = await screen.findByTitle('Accept');
            await user.click(acceptButton);

            const successMessage = await screen.findByText(InviteAcceptedJson.message);
            expect(successMessage).toBeInTheDocument();
        });

        it('render error message on failed reject invite', async () => {
            renderWithDefaultData(<Item type="Invites" item={item} />);

            mock({
                path: `/api/invites/${item.friend.id}`,
                status: 500,
                method: 'put',
            });

            const acceptButton = await screen.findByTitle('Accept');
            await user.click(acceptButton);

            const successMessage = await screen.findByText('Something went wrong, try again later');
            expect(successMessage).toBeInTheDocument();
        });
    });

    describe('User from friends list', () => {
        const item = FriendsFirstPageJson.data[0];

        it('render user image, name, poked data, buttons', async () => {
            renderWithDefaultData(<Item type="Friends" item={item} />);

            const userName = await screen.findByText(item.friend.name);
            const userProfileImage = await screen.findByAltText(item.friend.name);
            const sendMessageButton = await screen.findByTitle('Send message');
            const removeButton = await screen.findByTitle('Remove');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(sendMessageButton).toBeInTheDocument();
            expect(removeButton).toBeInTheDocument();
        });

        it('render success message on successfully destroyed friendship', async () => {
            renderWithDefaultData(<Item type="Friends" item={item} />);

            mock({
                path: `/api/friends/${item.friend.id}`,
                status: 204,
                method: 'delete',
            });

            const removeButton = await screen.findByTitle('Remove');
            await user.click(removeButton);

            const successMessage = await screen.findByText('Friendship destroyed');
            expect(successMessage).toBeInTheDocument();
        });

        it('render error message on failed destroying friendship', async () => {
            renderWithDefaultData(<Item type="Friends" item={item} />);

            mock({
                path: `/api/friends/${item.friend.id}`,
                status: 500,
                method: 'delete',
            });

            const removeButton = await screen.findByTitle('Remove');
            await user.click(removeButton);

            const errorMessage = await screen.findByText('Something went wrong, try again later');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
