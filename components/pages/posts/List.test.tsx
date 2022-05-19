import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { List } from '@components/pages/posts/List';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostsEmptyPageJson from '@mocks/posts/empty.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';

describe('List component', () => {
    it('show loaders on initial fetching posts', () => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);

        renderWithDefaultData(<List />);

        const loaders = screen.getByTestId('postsList-loading_loader');
        expect(loaders).toBeInTheDocument();
    });

    it('load 15 posts', async () => {
        mock('/api/posts?page=1', 200, PostsFirstPageJson);

        renderWithDefaultData(<List />);

        const firstPost = await screen.findByText(PostsFirstPageJson[0].content);
        expect(firstPost).toBeInTheDocument();

        const fiveteenthPost = await screen.findByText(PostsFirstPageJson[14].content);
        expect(fiveteenthPost).toBeInTheDocument();
    });

    it('show empty component when fetch no posts', async () => {
        mock('/api/posts?page=1', 200, PostsEmptyPageJson);

        renderWithDefaultData(<List />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component when api returns error', async () => {
        mock('/api/posts?page=1', 500);

        renderWithDefaultData(<List />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
