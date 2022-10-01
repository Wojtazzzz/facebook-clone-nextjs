import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostsEmptyPageJson from '@mocks/posts/empty.json';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';
import { mock } from '@utils/nock';
import { Posts } from './Posts';
import { getPostsQK } from '@utils/queryKeys';

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

        renderWithDefaultData(<Posts queryKey={getPostsQK({ type: 'all' })} endpoint="/api/posts" />);

        const loaders = screen.getByTestId('posts-loadingLoader');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 10 posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });

        renderWithDefaultData(<Posts queryKey={getPostsQK({ type: 'all' })} endpoint="/api/posts" />);

        const firstPost = await screen.findByText(posts[0].content);
        expect(firstPost).toBeInTheDocument();

        const tenthPost = await screen.findByText(posts[9].content);
        expect(tenthPost).toBeInTheDocument();
    });

    it('render error component when api returns error', async () => {
        mock({
            path: '/api/posts?page=1',
            status: 500,
        });

        renderWithDefaultData(<Posts queryKey={getPostsQK({ type: 'all' })} endpoint="/api/posts" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render empty component when fetched no posts from all posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<Posts queryKey={getPostsQK({ type: 'all' })} endpoint="/api/posts" />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render empty component when fetched no posts from hidden posts', async () => {
        mock({
            path: '/api/hidden/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', 'hidden']} endpoint="/api/hidden/posts" />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render empty component when fetched no posts from saved posts', async () => {
        mock({
            path: '/api/saved/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', 'saved']} endpoint="/api/saved/posts" />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('not render empty component when fetched no posts from own posts', async () => {
        mock({
            path: '/api/users/1/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', 'own', 1]} endpoint="/api/users/1/posts" />);

        const emptyComponent = screen.queryByText('No posts, add some friends!');
        expect(emptyComponent).not.toBeInTheDocument();
    });
});
