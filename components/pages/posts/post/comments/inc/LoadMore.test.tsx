import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';
import { screen } from '@testing-library/react';

describe('LoadMore component', () => {
    it('show "View more comments" when didn\'t fetch all comments', () => {
        const mockHandleLoadMoreComments = jest.fn();

        renderWithDefaultData(
            <LoadMore isFetching={false} isReachedEnd={false} callback={mockHandleLoadMoreComments} />
        );

        const viewMoreCommentsText = screen.getByText('View more comments');
        expect(viewMoreCommentsText).toBeInTheDocument();

        const writeCommentText = screen.queryByText('Write a comment...');
        expect(writeCommentText).not.toBeInTheDocument();
    });

    it('show "Write a comment..." when fetched all comments', () => {
        const mockHandleLoadMoreComments = jest.fn();

        renderWithDefaultData(
            <LoadMore isFetching={false} isReachedEnd={true} callback={mockHandleLoadMoreComments} />
        );

        const viewMoreCommentsText = screen.queryByText('View more comments');
        expect(viewMoreCommentsText).not.toBeInTheDocument();

        const writeCommentText = screen.getByText('Write a comment...');
        expect(writeCommentText).toBeInTheDocument();
    });

    it("execute load more comments function when didn't fetch all comments", () => {
        const mockHandleLoadMoreComments = jest.fn();

        renderWithDefaultData(
            <LoadMore isFetching={false} isReachedEnd={false} callback={mockHandleLoadMoreComments} />
        );

        const button = screen.getByLabelText('Load more comments');
        button.click();

        expect(mockHandleLoadMoreComments).toHaveBeenCalledTimes(1);
    });

    it('not execute load more comments function when fetched all comments', () => {
        const mockHandleLoadMoreComments = jest.fn();

        renderWithDefaultData(
            <LoadMore isFetching={false} isReachedEnd={true} callback={mockHandleLoadMoreComments} />
        );

        const button = screen.getByText('Write a comment...');
        button.click();

        expect(mockHandleLoadMoreComments).not.toHaveBeenCalled();
    });

    it('show loaders when comments are fetching', () => {
        const mockHandleLoadMoreComments = jest.fn();

        renderWithDefaultData(
            <LoadMore isFetching={true} isReachedEnd={false} callback={mockHandleLoadMoreComments} />
        );

        const loader = screen.getByTestId('postsCommentsList-fetching_loader');

        expect(loader).toBeInTheDocument();
    });
});
