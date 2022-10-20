import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';
import { Create } from './Create';

describe('Create component tests', () => {
    const post = PostsFirstPageJson.data[0];

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('show loaders when logged user is loading', () => {
        renderWithDefaultData(<Create postId={post.id} />);

        const loaders = screen.getByTestId('commentsCreate-loader');

        expect(loaders).toBeInTheDocument();
    });
});
