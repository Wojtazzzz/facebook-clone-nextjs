import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Menu } from '@components/pages/posts/post/inc/settings/Menu';
import { screen, waitFor } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import JaneDoeJson from '@mocks/user/johnDoe.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();

    beforeEach(() => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('"Delete post" option show when logged user is post author', async () => {
        mock('/api/user', 200, RootUserJson);

        renderWithDefaultData(<Menu authorId={RootUserJson.id} postId={1} closeMenu={mockCloseMenu} />);

        const deletePostOption = await screen.findByLabelText('Delete Post');

        expect(deletePostOption).toBeInTheDocument();
    });

    it('"Delete post" option not show when logged user is not post author', async () => {
        mock('/api/user', 200, JaneDoeJson);

        renderWithDefaultData(<Menu authorId={RootUserJson.id} postId={1} closeMenu={mockCloseMenu} />);

        await waitFor(() => {
            const deletePostOption = screen.queryByLabelText('Delete Post');

            expect(deletePostOption).not.toBeInTheDocument();
        });
    });
});
