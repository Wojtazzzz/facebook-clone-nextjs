import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Create } from '@components/pages/posts/post/comments/create/Create';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';

describe('Create component', () => {
    const post = PostsFirstPageJson.data[0];

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('show loaders when logged user is loading', () => {
        renderWithDefaultData(<Create postId={post.id} />);

        const loaders = screen.getByTestId('commentsCreate-loader');

        expect(loaders).toBeInTheDocument();
    });
});
