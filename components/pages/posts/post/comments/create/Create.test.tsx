import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Create } from '@components/pages/posts/post/comments/create/Create';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';

describe('Create component', () => {
    const post = PostsFirstPageJson[0];
    const mockReloadComments = jest.fn();

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('show loaders when logged user is loading', () => {
        renderWithDefaultData(<Create postId={post.id} reloadComments={mockReloadComments} />);

        const loaders = screen.getByTestId('commentsCreate-loader');

        expect(loaders).toBeInTheDocument();
    });
});
