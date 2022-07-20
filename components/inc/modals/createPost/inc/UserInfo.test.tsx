import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { UserInfo } from '@components/inc/modals/createPost/inc/UserInfo';

describe('UserInfo component', () => {
    it('renders user avatar and name properly', async () => {
        renderWithDefaultData(<UserInfo user={RootUserJson} />);

        const avatar = await screen.findByAltText(`${RootUserJson.first_name} profile image`);
        const name = await screen.findByText(RootUserJson.name);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    });

    it('have href attribute to user profile', () => {
        renderWithDefaultData(<UserInfo user={RootUserJson} />);

        const link = screen.getByTitle(`${RootUserJson.name} profile`);

        expect(link).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
    });
});
