import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Menu } from '@components/pages/posts/post/inc/settings/menu/Menu';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('render NormalMenu when "NORMAL" type passed', async () => {
        mock('/api/user', 200, RootUserJson);

        renderWithDefaultData(
            <Menu postId={post.id} authorId={RootUserJson.id} type="NORMAL" closeMenu={mockCloseMenu} />
        );

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });

    it('render HiddenMenu when "HIDDEN" type passed', async () => {
        renderWithDefaultData(
            <Menu postId={post.id} authorId={RootUserJson.id} type="HIDDEN" closeMenu={mockCloseMenu} />
        );

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render SavedMenu when "SAVED" type passed', async () => {
        renderWithDefaultData(
            <Menu postId={post.id} authorId={RootUserJson.id} type="SAVED" closeMenu={mockCloseMenu} />
        );

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });
});
