import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { List } from '@components/pages/posts/list/List';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostsEmptyPageJson from '@mocks/posts/empty.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';

describe('List component', () => {
    const posts = PostsFirstPageJson.data;

    it('render loaders on initial fetching posts', () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });

        renderWithDefaultData(<List />);

        const loaders = screen.getByTestId('postsList-loading_loader');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 10 posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });

        renderWithDefaultData(<List />);

        const firstPost = await screen.findByText(posts[0].content);
        expect(firstPost).toBeInTheDocument();

        const fiveteenthPost = await screen.findByText(posts[9].content);
        expect(fiveteenthPost).toBeInTheDocument();
    });

    it('render empty component when fetch no posts', async () => {
        mock({
            path: '/api/posts?page=1',
            data: PostsEmptyPageJson,
        });

        renderWithDefaultData(<List />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component when api returns error', async () => {
        mock({
            path: '/api/posts?page=1',
            status: 500,
        });

        renderWithDefaultData(<List />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
