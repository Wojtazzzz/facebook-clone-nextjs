import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Friends } from './Friends';
import RootUserJson from '@mocks/user/root.json';
import NineFriendsJson from '@mocks/profile/friends/nineFriends.json';
import OneFriendJson from '@mocks/profile/friends/oneFriend.json';
import NoFriendsJson from '@mocks/profile/friends/empty.json';
import { screen, within } from '@testing-library/react';
import { mock } from '@libs/nock';

describe('Friends tests', () => {
    it('render properly header', () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: NineFriendsJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const header = screen.getByText('Friends');

        expect(header).toBeInTheDocument();
    });

    it('can render nine friends', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: NineFriendsJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const list = await screen.findByRole('list');

        const listElements = within(list).getAllByRole('listitem');

        expect(listElements).toHaveLength(9);
    });

    it('can render one friend', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: OneFriendJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const list = await screen.findByRole('list');

        const listElements = within(list).getAllByRole('listitem');

        expect(listElements).toHaveLength(1);
    });

    it('render friend name and image', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: OneFriendJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const friend = await screen.findByRole('listitem');

        const image = within(friend).getByRole('img');
        const name = within(friend).getByText(OneFriendJson[0].name);

        expect(image).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    });

    it('friend is link to his profile page', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: OneFriendJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const friend = await screen.findByRole('listitem');

        const link = within(friend).getByRole('link');

        expect(link).toHaveAttribute('href', `/profile/${OneFriendJson[0].id}`);
    });

    it('render empty component when api return empty response', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            data: NoFriendsJson,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const image = await screen.findByAltText('List is empty');
        const text = await screen.findByText('No friends to display');

        expect(image).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('render error component when api return server error', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends?count=9`,
            status: 500,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const image = await screen.findByAltText('Server error');
        const text = await screen.findByText('Something went wrong');

        expect(image).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
