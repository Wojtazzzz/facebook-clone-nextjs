import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import ProfileFriendsJson from '@mocks/ssg/profileFriends.json';
import { screen, within } from '@testing-library/react';
import { User } from '@components/pages/profile/hero/user/User';

describe('Profile User info tests', () => {
    it('render properly username and profile image', async () => {
        renderWithDefaultData(
            <User
                id={RootUserJson.id}
                firstName={RootUserJson.first_name}
                name={RootUserJson.name}
                profileImage={RootUserJson.profile_image}
                friends={ProfileFriendsJson}
            />
        );

        const name = screen.getByText(RootUserJson.name);
        const image = screen.getByAltText(`${RootUserJson.first_name} profile image`);

        expect(name).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('render max 5 friends images, but text point on amount of all friends', () => {
        renderWithDefaultData(
            <User
                id={RootUserJson.id}
                firstName={RootUserJson.first_name}
                name={RootUserJson.name}
                profileImage={RootUserJson.profile_image}
                friends={ProfileFriendsJson}
            />
        );

        const friendsAmount = screen.getByText(`${ProfileFriendsJson.amount} Friends`);

        const friendsImagesContainer = screen.getByTestId('profile-friendsList');
        const friendsImages = within(friendsImagesContainer).getAllByRole('img');

        expect(friendsAmount).toBeInTheDocument();
        expect(friendsImages).toHaveLength(5);
    });
});
