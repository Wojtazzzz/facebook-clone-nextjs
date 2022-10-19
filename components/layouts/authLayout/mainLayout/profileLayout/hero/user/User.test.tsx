import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import NineFriends from '@mocks/profile/friends/getByCount/nineFriends.json';
import { screen, within } from '@testing-library/react';
import { mock } from '@utils/nock';
import { User } from './User';

describe('Profile User info tests', () => {
    beforeEach(() => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/get-by-count?count=8`,
            data: NineFriends,
        });
    });

    it('render properly username and profile image', async () => {
        renderWithDefaultData(
            <User
                id={RootUserJson.id}
                firstName={RootUserJson.first_name}
                name={RootUserJson.name}
                profileImage={RootUserJson.profile_image}
            />
        );

        const name = screen.getByText(RootUserJson.name);
        const image = screen.getByAltText(`${RootUserJson.first_name} profile image`);

        expect(name).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('render max 8 friends images, but text point on amount of all friends', async () => {
        renderWithDefaultData(
            <User
                id={RootUserJson.id}
                firstName={RootUserJson.first_name}
                name={RootUserJson.name}
                profileImage={RootUserJson.profile_image}
            />
        );

        const friendsAmount = await screen.findByText(`${NineFriends.count} friends`);

        const friendsImagesContainer = screen.getByTestId('profile-friendsList');
        const friendsImages = within(friendsImagesContainer).getAllByRole('img');

        expect(friendsAmount).toBeInTheDocument();
        expect(friendsImages).toHaveLength(8);
    });
});
