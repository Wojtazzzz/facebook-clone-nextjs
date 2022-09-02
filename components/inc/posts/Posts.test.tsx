import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import SelfProfileFirstPageJson from '@mocks/posts/selfProfileFirstPage.json';
import SelfProfileEmptyPageJson from '@mocks/posts/selfProfileEmptyPageJson.json';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';
import { Posts } from './Posts';

describe('Posts component', () => {
    const posts = SelfProfileFirstPageJson.data;

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render loaders when loading', () => {
        mock({
            path: '/api/users/1/posts?page=1',
            data: SelfProfileFirstPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', '1']} endpoint="/api/users/1/posts" />);

        const loaders = screen.getByTestId('posts-loadingLoader');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 10 posts', async () => {
        mock({
            path: '/api/users/1/posts?page=1',
            data: SelfProfileFirstPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', '1']} endpoint="/api/users/1/posts" />);

        const firstPost = await screen.findByText(posts[0].content);
        expect(firstPost).toBeInTheDocument();

        const tenthPost = await screen.findByText(posts[9].content);
        expect(tenthPost).toBeInTheDocument();
    });

    it('render empty component when fetched no posts', async () => {
        mock({
            path: '/api/users/1/posts?page=1',
            data: SelfProfileEmptyPageJson,
        });

        renderWithDefaultData(<Posts queryKey={['posts', '1']} endpoint="/api/users/1/posts" />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component when api returns error', async () => {
        mock({
            path: '/api/users/1/posts?page=1',
            status: 500,
        });

        renderWithDefaultData(<Posts queryKey={['posts', '1']} endpoint="/api/users/1/posts" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
