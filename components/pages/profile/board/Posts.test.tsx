import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { Posts } from '@components/pages/profile/board/Posts';

describe('Posts component', () => {
    const mockLoadMore = jest.fn();

    it('show loaders when state is "LOADING"', () => {
        renderWithDefaultData(
            <Posts
                state="LOADING"
                data={[]}
                isEmpty={false}
                isReachedEnd={false}
                type="NORMAL"
                loadMore={mockLoadMore}
            />
        );

        const loaders = screen.getByTestId('boardPosts-loading_loader');
        expect(loaders).toBeInTheDocument();
    });

    it('load 10 posts', async () => {
        renderWithDefaultData(
            <Posts
                state="SUCCESS"
                data={PostsFirstPageJson}
                isEmpty={false}
                isReachedEnd={false}
                type="NORMAL"
                loadMore={mockLoadMore}
            />
        );

        const firstPost = await screen.findByText(PostsFirstPageJson[0].content);
        expect(firstPost).toBeInTheDocument();

        const tenthPost = await screen.findByText(PostsFirstPageJson[9].content);
        expect(tenthPost).toBeInTheDocument();
    });

    it('show empty component when fetch no posts', async () => {
        renderWithDefaultData(
            <Posts
                state="SUCCESS"
                data={[]}
                isEmpty={true}
                isReachedEnd={false}
                type="NORMAL"
                loadMore={mockLoadMore}
            />
        );

        const emptyComponent = await screen.findByText('No posts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component when api returns error', async () => {
        renderWithDefaultData(
            <Posts state="ERROR" data={[]} isEmpty={false} isReachedEnd={false} type="NORMAL" loadMore={mockLoadMore} />
        );

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
