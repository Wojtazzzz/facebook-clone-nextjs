import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';
import { screen } from '@testing-library/react';
import CommentsFirstPageJson from '@mocks/posts/firstPage.json';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('LoadMore component', () => {
    const user = userEvent.setup();

    it('render "View more comments" when don\'t fetch all comments', () => {
        const mockFetchNextPage = jest.fn();
        const hasNextPage = true;
        const isFetchingNextPage = false;

        mock('/api/posts/1/comments', 200, CommentsFirstPageJson);

        renderWithDefaultData(
            <LoadMore
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreCommentsText = screen.getByText('View more comments');
        expect(viewMoreCommentsText).toBeInTheDocument();

        const writeCommentText = screen.queryByText('Write a comment...');
        expect(writeCommentText).not.toBeInTheDocument();
    });

    it('show "Write a comment..." when fetched all comments', () => {
        const mockFetchNextPage = jest.fn();
        const hasNextPage = false;
        const isFetchingNextPage = false;

        renderWithDefaultData(
            <LoadMore
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreCommentsText = screen.queryByText('View more comments');
        expect(viewMoreCommentsText).not.toBeInTheDocument();

        const writeCommentText = screen.getByText('Write a comment...');
        expect(writeCommentText).toBeInTheDocument();
    });

    it('execute fetchNextPage when click on "View more comments"', async () => {
        const mockFetchNextPage = jest.fn();
        const hasNextPage = true;
        const isFetchingNextPage = false;

        renderWithDefaultData(
            <LoadMore
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const button = screen.getByLabelText('Load more comments');
        await user.click(button);

        expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
    });

    it('render loaders without buttons when comments are fetching', () => {
        const mockFetchNextPage = jest.fn();
        const hasNextPage = true;
        const isFetchingNextPage = true;

        renderWithDefaultData(
            <LoadMore
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const writeCommentText = screen.queryByText('Write a comment...');
        const viewMoreComments = screen.queryByLabelText('Load more comments');
        const loader = screen.getByTestId('postsCommentsList-fetching_loader');

        expect(writeCommentText).not.toBeInTheDocument();
        expect(viewMoreComments).not.toBeInTheDocument();
        expect(loader).toBeInTheDocument();
    });
});
