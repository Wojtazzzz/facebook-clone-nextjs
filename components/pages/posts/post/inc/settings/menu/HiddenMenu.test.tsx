import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';
import { HiddenMenu } from '@components/pages/posts/post/inc/settings/menu/HiddenMenu';

describe('HiddenMenu component', () => {
    const mockCloseMenu = jest.fn();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('render "unhide" option', async () => {
        renderWithDefaultData(<HiddenMenu postId={post.id} closeMenu={mockCloseMenu} />);

        const unhideOption = await screen.findByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });
});
