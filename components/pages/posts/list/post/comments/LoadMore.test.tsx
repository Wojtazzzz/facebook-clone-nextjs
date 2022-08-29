import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import CommentsFirstPageJson from '@mocks/posts/firstPage.json';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';
import { LoadMore } from './LoadMore';

describe('LoadMore component', () => {
    const user = userEvent.setup();

    it('render "View more comments" when don\'t fetch all comments', () => {
        const mockFetchNextPage = jest.fn();
        const isEmpty = false;
        const hasNextPage = true;
        const isFetchingNextPage = false;

        mock({
            path: '/api/posts/1/comments',
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(
            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreCommentsText = screen.getByText('View more comments');

        expect(viewMoreCommentsText).toBeInTheDocument();
    });

    it('execute fetchNextPage when click on "View more comments"', async () => {
        const mockFetchNextPage = jest.fn();
        const isEmpty = false;
        const hasNextPage = true;
        const isFetchingNextPage = false;

        renderWithDefaultData(
            <LoadMore
                isEmpty={isEmpty}
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
        const isEmpty = false;
        const hasNextPage = true;
        const isFetchingNextPage = true;

        renderWithDefaultData(
            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreComments = screen.queryByLabelText('Load more comments');
        const loader = screen.getByTestId('postsCommentsList-fetching_loader');

        expect(viewMoreComments).not.toBeInTheDocument();
        expect(loader).toBeInTheDocument();
    });

    it('render nothing when isEmpty is true', () => {
        const mockFetchNextPage = jest.fn();
        const isEmpty = true;
        const hasNextPage = true;
        const isFetchingNextPage = true;

        renderWithDefaultData(
            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreComments = screen.queryByLabelText('Load more comments');

        expect(viewMoreComments).not.toBeInTheDocument();
    });

    it('render nothing when hasNextPage is false', () => {
        const mockFetchNextPage = jest.fn();
        const isEmpty = true;
        const hasNextPage = false;
        const isFetchingNextPage = true;

        renderWithDefaultData(
            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={mockFetchNextPage}
            />
        );

        const viewMoreComments = screen.queryByLabelText('Load more comments');

        expect(viewMoreComments).not.toBeInTheDocument();
    });
});
