import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';
import { NormalMenu } from '@components/pages/posts/post/inc/settings/menu/NormalMenu';

describe('NormalMenu component', () => {
    const mockCloseMenu = jest.fn();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('render "Delete" option when logged user is post author', async () => {
        mock('/api/user', 200, post.author);

        renderWithDefaultData(<NormalMenu authorId={post.author.id} postId={post.id} closeMenu={mockCloseMenu} />);

        const deleteOption = await screen.findByLabelText('Delete');
        const hideOption = screen.queryByLabelText('Hide');
        const saveOption = screen.queryByLabelText('Save');

        expect(deleteOption).toBeInTheDocument();
        expect(hideOption).not.toBeInTheDocument();
        expect(saveOption).not.toBeInTheDocument();
    });

    it('render "Save" and "Hide" option when logged user is not post author', async () => {
        mock('/api/user', 200, RootUserJson);

        renderWithDefaultData(<NormalMenu authorId={post.author.id} postId={post.id} closeMenu={mockCloseMenu} />);

        const deleteOption = screen.queryByLabelText('Delete');
        const hideOption = await screen.findByLabelText('Hide');
        const saveOption = await screen.findByLabelText('Save');

        expect(deleteOption).not.toBeInTheDocument();
        expect(hideOption).toBeInTheDocument();
        expect(saveOption).toBeInTheDocument();
    });
});
