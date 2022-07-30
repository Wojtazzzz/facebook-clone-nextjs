import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import SelfProfileFirstPageJson from '@mocks/posts/selfProfileFirstPage.json';
import { screen } from '@testing-library/react';
import { Posts } from '@components/pages/profile/board/Posts';
import { mock } from '@libs/nock';

describe('Posts component', () => {
    it('show loaders when loading', () => {
        mock('/api/users/1/posts?page=1', 200, SelfProfileFirstPageJson);

        renderWithDefaultData(<Posts endpoint="/api/users/1/posts" />);

        const loaders = screen.getByTestId('boardPosts-loading_loader');
        expect(loaders).toBeInTheDocument();
    });

    it('fetch 10 posts', async () => {
        mock('/api/users/1/posts?page=1', 200, SelfProfileFirstPageJson);

        renderWithDefaultData(<Posts endpoint="/api/users/1/posts" />);

        const firstPost = await screen.findByText(SelfProfileFirstPageJson[0].content);
        expect(firstPost).toBeInTheDocument();

        const tenthPost = await screen.findByText(SelfProfileFirstPageJson[9].content);
        expect(tenthPost).toBeInTheDocument();
    });

    it('show empty component when fetched no posts', async () => {
        mock('/api/users/1/posts?page=1', 200, {});

        renderWithDefaultData(<Posts endpoint="/api/users/1/posts" />);

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component when api returns error', async () => {
        mock('/api/users/1/posts?page=1', 500, {});

        renderWithDefaultData(<Posts endpoint="/api/users/1/posts" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
