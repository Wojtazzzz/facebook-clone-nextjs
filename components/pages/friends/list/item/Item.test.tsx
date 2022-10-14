import { screen } from '@testing-library/react';
import { Item } from '@components/pages/friends/list/item/Item';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@utils/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import InvitesFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
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

            const errorMessage = await screen.findByText('Something went wrong, try again later');
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
    });

    describe('User from friends list', () => {
        const item = FriendsFirstPageJson.data[0];

        it('render user image, name, poked data, buttons', async () => {
            renderWithDefaultData(<Item type="Friends" item={item} />);

            const userName = await screen.findByText(item.friend.name);
            const userProfileImage = await screen.findByAltText(item.friend.name);
            const sendMessageButton = await screen.findByTitle('Message');
            const removeButton = await screen.findByTitle('Remove');

            expect(userProfileImage).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
            expect(sendMessageButton).toBeInTheDocument();
            expect(removeButton).toBeInTheDocument();
        });
    });
});
