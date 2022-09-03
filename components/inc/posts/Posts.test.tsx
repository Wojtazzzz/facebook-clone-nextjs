import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostsEmptyPageJson from '@mocks/posts/empty.json';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';
import { Posts } from './Posts';

describe('Posts component', () => {
    const posts = PostsFirstPageJson.data;

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render loaders when loading', () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });

        renderWithDefaultData(<Posts postsList="all" userId={1} />);

        const loaders = screen.getByTestId('posts-loadingLoader');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 10 posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });

        renderWithDefaultData(<Posts postsList="all" userId={1} />);

        const firstPost = await screen.findByText(posts[0].content);
        expect(firstPost).toBeInTheDocument();

        const tenthPost = await screen.findByText(posts[9].content);
        expect(tenthPost).toBeInTheDocument();
    });

    it('render empty component when fetched no posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<Posts postsList="all" userId={1} />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component when api returns error', async () => {
        mock({
            path: '/api/posts?page=1',
            status: 500,
        });

        renderWithDefaultData(<Posts postsList="all" userId={1} />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
