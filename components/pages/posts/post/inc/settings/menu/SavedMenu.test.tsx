import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';
import { SavedMenu } from '@components/pages/posts/post/inc/settings/menu/SavedMenu';

describe('SavedMenu component', () => {
    const mockCloseMenu = jest.fn();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('render "unhide" option', async () => {
        renderWithDefaultData(<SavedMenu postId={post.id} closeMenu={mockCloseMenu} />);

        const unsaveOption = await screen.findByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });
});
